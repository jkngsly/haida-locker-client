export default interface Ding {
    icon?: string
    text?: string
    actionText?: string
    actionCallback?: () => void
    seen?: boolean
}
