export enum FLAGGED_MESSAGE_STATUS {
  new = 'new',
  applied = 'applied',
  deleted = 'deleted',
  pending = 'pending'
}

export const FLAGGED_MESSAGE_STATUSES = Object.values(FLAGGED_MESSAGE_STATUS)

export enum FLAG_REASON {
  auto_hook = 'auto_hook',
  action = 'action',
  manual = 'manual'
}

export enum RESOLUTION_TYPE {
  qna = 'qna',
  intent = 'intent'
}

export type FlaggedEvent = {
  eventId: string
  botId: string
  language: string
  preview: string
  reason: FLAG_REASON
  status?: FLAGGED_MESSAGE_STATUS
  resolutionType?: RESOLUTION_TYPE
  resolution?: string | null
  resolutionParams?: string | object | null
}

export type DbFlaggedEvent = FlaggedEvent & {
  id: number
  createdAt: string
  updatedAt: string
}

export type ContextMessage = {
  direction: 'incoming' | 'outgoing'
  preview: string
  payloadMessage: string
  isCurrent: boolean
}

export type ApiFlaggedEvent = DbFlaggedEvent & {
  context: ContextMessage[]
  nluContexts: string[]
}

export type ResolutionData = {
  resolutionType: RESOLUTION_TYPE
  resolution: string | null
  resolutionParams?: object | null
}
