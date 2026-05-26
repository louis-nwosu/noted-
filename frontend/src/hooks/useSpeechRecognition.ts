'use client';

import { useCallback, useEffect, useRef, useState } from 'react';

interface UseSpeechRecognitionOptions {
  onResult?: (text: string) => void;
  onInterim?: (text: string) => void;
  onError?: (error: string) => void;
  language?: string;
}

interface UseSpeechRecognitionReturn {
  isListening: boolean;
  transcript: string;
  interimTranscript: string;
  supported: boolean;
  error: string | null;
  startListening: () => void;
  stopListening: () => void;
}

export function useSpeechRecognition(options: UseSpeechRecognitionOptions = {}): UseSpeechRecognitionReturn {
  const { onResult, onInterim, onError, language = 'en-US' } = options;

  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [interimTranscript, setInterimTranscript] = useState('');
  const [error, setError] = useState<string | null>(null);

  const recognitionRef = useRef<any>(null);
  const transcriptRef = useRef('');
  const isListeningRef = useRef(false);

  const SpeechRecognition =
    typeof window !== 'undefined'
      ? (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition
      : null;

  const supported = SpeechRecognition !== null && SpeechRecognition !== undefined;

  const stopListening = useCallback(() => {
    isListeningRef.current = false;
    try {
      recognitionRef.current?.stop();
    } catch {}
    recognitionRef.current = null;
    setIsListening(false);
  }, []);

  const startListening = useCallback(() => {
    if (!SpeechRecognition) return;

    if (recognitionRef.current) {
      stopListening();
      return;
    }

    setError(null);
    transcriptRef.current = '';
    setTranscript('');
    setInterimTranscript('');

    const recognition = new SpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = language;

    recognition.onresult = (event: any) => {
      let interim = '';
      let final = '';

      for (let i = event.resultIndex; i < event.results.length; i++) {
        const result = event.results[i];
        if (result.isFinal) {
          final += result[0].transcript;
        } else {
          interim += result[0].transcript;
        }
      }

      if (final) {
        transcriptRef.current += final;
        setTranscript(transcriptRef.current);
        onResult?.(transcriptRef.current);
      }

      if (interim) {
        setInterimTranscript(interim);
        onInterim?.(interim);
      } else {
        setInterimTranscript('');
        onInterim?.('');
      }
    };

    recognition.onerror = (event: any) => {
      setError(event.error);
      onError?.(event.error);

      if (event.error === 'not-allowed') {
        isListeningRef.current = false;
        setIsListening(false);
        recognitionRef.current = null;
      }
    };

    recognition.onend = () => {
      if (isListeningRef.current) {
        try {
          recognition.start();
        } catch {}
      } else {
        setIsListening(false);
        setInterimTranscript('');
        recognitionRef.current = null;
      }
    };

    recognitionRef.current = recognition;
    isListeningRef.current = true;

    try {
      recognition.start();
      setIsListening(true);
    } catch {
      setError('Failed to start speech recognition');
      recognitionRef.current = null;
    }
  }, [SpeechRecognition, language, onResult, onInterim, onError, stopListening]);

  useEffect(() => {
    return () => {
      isListeningRef.current = false;
      try {
        recognitionRef.current?.abort();
      } catch {}
      recognitionRef.current = null;
    };
  }, []);

  return {
    isListening,
    transcript,
    interimTranscript,
    supported,
    error,
    startListening,
    stopListening,
  };
}
