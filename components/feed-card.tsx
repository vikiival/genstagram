import { Dialog } from "./ui/dialog";
import { DynamicImage } from "./dynamic-image";

export default function FeedCard({ image, author, text, timestamp, pfp }: {image: string; author: string; text: string, timestamp: string; pfp: string}) {
  return (
    <Dialog>
      <DynamicImage image={image} author={author} text={text} timestamp={timestamp} pfp={pfp}  />
    </Dialog>
  );
}
