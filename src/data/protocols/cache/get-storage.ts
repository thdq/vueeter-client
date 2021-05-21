export interface GetStorage {
    key: string

    get (key: string): Promise<any>
}
