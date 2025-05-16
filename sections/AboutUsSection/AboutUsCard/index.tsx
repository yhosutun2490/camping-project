import Image from "next/image"
interface Props {
  data: {
    id: string,
    title: string,
    image: string,
    description: string
  }
}

export default function AboutUsCard({ data: { id, title, image, description } }: Props) {

  return (
    < div className="about_card border-2 border-primary-300 rounded-xl shadow-sm flex items-center" >
      <figure className="flex items-center justify-center min-w-16 h-16 bg-primary-50 rounded-full">
        <Image
          width={32}
          height={32}
          src={image}
          alt={title}
        />
      </figure>
      <div className="card-body text-start">
        <h2 className="card-title">{title}</h2>
        <p>{description}</p>
      </div>
    </div >
  )

}