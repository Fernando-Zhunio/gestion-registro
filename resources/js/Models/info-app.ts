import { IPeriod } from "@/Pages/Periods/types/period.types"

export interface IAppInfo {
    user: User
    currentState: CurrentState
    sidebar: Sidebar;
    periods: IPeriod[]
  }
  
  export interface User {
    id: number
    name: string
    email: string
    email_verified_at: string
    created_at: string
    updated_at: string
    roles: Role[]
  }
  
  export interface Role {
    id: number
    name: string
    guard_name: string
    created_at: string
    updated_at: string
    pivot: Pivot
  }
  
  export interface Pivot {
    model_id: number
    role_id: number
    model_type: string
  }
  
  export interface CurrentState {
    id: number
    observation: string
    name_institution: string
    mission: string
    vision: string
    number_students: number
    number_teachers: number
    period_id: number
    created_at: string
    updated_at: string
    period: Period
  }
  
  export interface Period {
    id: number
    description: string
    start_date: string
    end_date: string
    promotion: string
    created_at: string
    updated_at: string
  }
  
  export interface Sidebar {
    links: Link[]
  }
  
  export interface Link {
    path: string
    icon: string
    name: string
    forRoles: string[]
  }
  