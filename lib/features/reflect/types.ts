export interface ReflectionMetadata {
  title: string;
  description: string;
  tags?: string;
}

export interface UploadAudioVariables {
  fileUri: string;
  meetingId?: string;
  metadata?: ReflectionMetadata;
}

export interface UploadResponse {
  success: boolean;
  recordingId: string;
  message?: string;
}

export interface MeetingMetadata {
  title?: string;
  description?: string;
  reflectionDate?: string;
  tags?: string;
}

export interface Reflection {
  id: string;
  title?: string;
  description?: string;
  reflectionDate?: string;
  tags?: string;
  filePath: string;
  createdAt: string;
  updatedAt: string;
  userId: string;
}

export interface ReflectionStats {
  totalDuration?: number;
  totalSize?: number;
}

export interface ReflectionResponse {
  success: boolean;
  data: Reflection[];
  pagination: {
    limit: number;
    offset: number;
    total: number;
  };
  stats: ReflectionStats;
  error?: string;
}

export interface GetReflectionOptions {
  limit?: number;
  offset?: number;
}
