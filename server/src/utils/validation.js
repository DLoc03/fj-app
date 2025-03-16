export const DataFormat = (date) => {
    if (!date) return null
    return new Date(date).toLocaleDateString('vi-VN')
}