import "./ModalVideo.css"

export const ModalVideo = ({link}) => {
  let id;
  if(link.includes("watch?v=")) {
    id = link.split("watch?v=")[1]
  } else {
    id = link.split("https://youtu.be/")[1]
  }

  const src = `https://www.youtube.com/embed/${id}&amp;start=1&autoplay=0&controls=0&volume=10`
  console.log(src)


  return (
    <iframe width="360" height="500" src={src} title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
         
  );
}