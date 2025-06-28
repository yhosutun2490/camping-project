 export const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // 月份從 0 開始，要 +1
    const day = date.getDate().toString().padStart(2, '0');
    return `${month}/${day}`;
  };

export const formateDateTime = (dateStr: string) => {
  return new Date(dateStr).toISOString().slice(0, 10)
}