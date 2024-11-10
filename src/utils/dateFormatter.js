const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

// return date in then next format: November 7, 2024
export const formatDate = (dateString) => {
    const date = new Date(dateString);
    return `${months[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`
}