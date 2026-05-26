import { Router } from "express";
import { authGuard } from "../middleware/authGuard";
import {
  listFolders,
  getFolderTree,
  createFolder,
  updateFolder,
  deleteFolder,
  moveNote,
} from "../controllers/folder.controller";

const router = Router();

router.use(authGuard);

router.get("/", listFolders);
router.get("/tree", getFolderTree);
router.post("/", createFolder);
router.put("/:id", updateFolder);
router.delete("/:id", deleteFolder);
router.put("/notes/:id/move", moveNote);

export default router;
