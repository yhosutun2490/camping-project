interface Props {
  description?: string;
}

export default function EventInfoDescription({
  description = `炎炎夏日避暑首選，親子戲水、溪邊煮食、夜晚營火晚會，讓孩子與大自然建立連結！`,
}: Props) {
  return (
    <div className="description text-base p-4">
      {description
        ?.split(/[,，、]/) // 同時支援中英文逗號
        .filter(Boolean) // 避免空字串
        .map((item, index) => (
          <li key={index}>{item.trim()}</li>
        ))}
    </div>
  );
}
