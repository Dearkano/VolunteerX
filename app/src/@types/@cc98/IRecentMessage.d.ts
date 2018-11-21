/**
 * @author dongyansong
 * @date 2018-10-26
 */
declare module '@cc98/api' {
  export interface IRecentMessage {
    userId: number
    time: string
    isRead: boolean
    lastContent: string
  }
}
