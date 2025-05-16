
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
    < div className="card card-side border-2 border-primary-300 rounded-xl shadow-sm" >
      <figure>
        <img
          src={image}
          alt={title} />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{title}</h2>
        <p>{description}</p>
      </div>
    </div >
  )

}