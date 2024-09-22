// Db constants
export enum ROLES {
  ADMIN = 'admin',
  MANAGER = 'manager',
  MEMBER = 'member',
}

export enum PROJECT_STATUS {
  COMPLETE = 'complete',
  ACTIVE = 'active',
  INACTIVE = 'inactive',
}

export enum TASK_STATUS {
  TODO = 'todo',
  INPROGRESS = 'inprogress',
  DONE = 'done',
}

export enum NOTIFICATION_STATUS {
  SEEN = 'seen',
  UNSEEN = 'unseen',
}

export interface ProjectInterface {
  _id?: string
  title: string
  description: string
  creator: UserInterface | string
  tasks?: TaskInterface[]
  members?: UserInterface[] | string
  status?: PROJECT_STATUS
}

type CommentTypes = {
  user: { name: string; _id: string }
  message: string
}
export interface TaskInterface {
  _id: string
  title: string
  description: string
  creator: UserInterface | string
  assignedTo: string
  createdAt: string
  comments: CommentTypes[]
  status: TASK_STATUS
}

export interface UserInterface {
  _id: string
  name: string
  email: string
  role: ROLES
  token?: string
  isDisabled?: boolean
  notifications?: string[]
  projects?: string[]
  tasks?: string
}

export interface NotificationInterface {
  _id: string
  to: string
  title: string
  message: string
  has_url: boolean
  url: string
  status: NOTIFICATION_STATUS
}

export type CustomFields = {
  onSubmit?: (val: unknown) => void
  header?: string
  error?: string
  items?: []
  loading?: boolean
}

export type Realtime = {
  type: 'task' | 'error'
  operation: 'create' | 'delete' | 'update' | 'comment'
  response: TaskInterface
  message: string
  payload: {
    title?: string
    description?: string
    assignedTo?: string
    projectId?: string
    status?: string
    message?: string
    userId?: string
    id: string
  }
}
