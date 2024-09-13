import { Dialog } from "./ui/dialog";
import { DynamicImage } from "./dynamic-image";

type FeedCardProps = {
  image: string;
  author: string;
  text: string;
  timestamp: string;
  pfp: string;
  fid?: number;
  user?: any
  score?: number
  calculateRank?: boolean;
};

export default function FeedCard(props: FeedCardProps) {
  return (
    <Dialog>
      <DynamicImage {...props} />
    </Dialog>
  );
}
