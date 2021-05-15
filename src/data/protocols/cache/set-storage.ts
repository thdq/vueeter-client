export interface SetStorage {
    key: string
    value: any

    set (key: string, value: string): Promise<void>
}
