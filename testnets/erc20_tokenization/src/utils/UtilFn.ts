export const formatAddress = (address: string | null | undefined): string => {
    if(!address) return ""
    
    return `${address?.slice(0,6)}...${address?.slice(-4)}`
}
