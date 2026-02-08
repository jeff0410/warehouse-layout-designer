export type FacilityType = 'rack' | 'conveyor' | 'robot' | 'workstation' | 'gate'

export interface FacilityData {
  label: string
  type: FacilityType
  capacity?: number
  status?: 'active' | 'idle' | 'error'
}
