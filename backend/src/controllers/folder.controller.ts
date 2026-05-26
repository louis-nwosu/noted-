import { Request, Response } from "express";
import { Folder, Note } from "../models";

export async function listFolders(req: Request, res: Response) {
  const userId = req.user!.userId;
  const folders = await Folder.find({ userId }).sort({ order: 1, name: 1 });
  res.json({ success: true, data: folders });
}

export async function getFolderTree(req: Request, res: Response) {
  const userId = req.user!.userId;
  const folders = await Folder.find({ userId }).sort({ order: 1, name: 1 }).lean();
  const notes = await Note.find({ userId, deletedAt: null })
    .select("-content")
    .sort({ pinnedAt: -1, updatedAt: -1 })
    .lean();

  const folderNotes: Record<string, any[]> = {};
  const unorganized: any[] = [];

  for (const note of notes) {
    if (note.folderId) {
      const key = note.folderId.toString();
      if (!folderNotes[key]) folderNotes[key] = [];
      folderNotes[key].push(note);
    } else {
      unorganized.push(note);
    }
  }

  const childrenMap: Record<string, any[]> = {};
  for (const f of folders) {
    const pid = f.parentId ? f.parentId.toString() : "root";
    if (!childrenMap[pid]) childrenMap[pid] = [];
    childrenMap[pid].push({ ...f, notes: folderNotes[f._id.toString()] || [], children: [] });
  }

  function buildTree(parentId: string): any[] {
    const items = childrenMap[parentId] || [];
    for (const item of items) {
      item.children = buildTree(item._id.toString());
    }
    return items;
  }

  const tree = buildTree("root");

  res.json({
    success: true,
    data: { folders: tree, unorganized },
  });
}

export async function createFolder(req: Request, res: Response) {
  const userId = req.user!.userId;
  const { name, parentId } = req.body;

  if (!name || typeof name !== "string" || !name.trim()) {
    res.status(400).json({
      success: false,
      error: { code: "VALIDATION_ERROR", message: "Folder name is required" },
    });
    return;
  }

  const count = await Folder.countDocuments({ userId, parentId: parentId || null });
  const folder = await Folder.create({
    userId,
    name: name.trim(),
    parentId: parentId || null,
    order: count,
  });

  res.status(201).json({ success: true, data: folder });
}

export async function updateFolder(req: Request, res: Response) {
  const userId = req.user!.userId;
  const { name, parentId, order } = req.body;

  const updates: any = {};
  if (name !== undefined) {
    if (!name.trim()) {
      res.status(400).json({
        success: false,
        error: { code: "VALIDATION_ERROR", message: "Folder name cannot be empty" },
      });
      return;
    }
    updates.name = name.trim();
  }
  if (parentId !== undefined) updates.parentId = parentId || null;
  if (order !== undefined) updates.order = order;

  const folder = await Folder.findOneAndUpdate(
    { _id: req.params.id, userId },
    { $set: updates },
    { new: true, runValidators: true }
  );

  if (!folder) {
    res.status(404).json({
      success: false,
      error: { code: "FOLDER_NOT_FOUND", message: "Folder not found" },
    });
    return;
  }

  res.json({ success: true, data: folder });
}

export async function deleteFolder(req: Request, res: Response) {
  const userId = req.user!.userId;
  const folder = await Folder.findOneAndDelete({ _id: req.params.id, userId });

  if (!folder) {
    res.status(404).json({
      success: false,
      error: { code: "FOLDER_NOT_FOUND", message: "Folder not found" },
    });
    return;
  }

  // Move notes in this folder to unorganized
  await Note.updateMany({ folderId: folder._id, userId }, { $set: { folderId: null } });

  // Re-parent child folders to this folder's parent
  await Folder.updateMany(
    { parentId: folder._id, userId },
    { $set: { parentId: folder.parentId } }
  );

  res.json({ success: true, data: null });
}

export async function moveNote(req: Request, res: Response) {
  const userId = req.user!.userId;
  const { folderId } = req.body;

  const note = await Note.findOneAndUpdate(
    { _id: req.params.id, userId, deletedAt: null },
    { $set: { folderId: folderId || null } },
    { new: true }
  );

  if (!note) {
    res.status(404).json({
      success: false,
      error: { code: "NOTE_NOT_FOUND", message: "Note not found" },
    });
    return;
  }

  res.json({ success: true, data: note });
}
