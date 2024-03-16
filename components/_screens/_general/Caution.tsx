import { CautionImage } from "@/assets/images";
import { cautionImageSize } from "@/utils/_variables";

const Caution: React.FC<{ size?: number }> = ({ size }) => {
  return <CautionImage width={cautionImageSize} height={cautionImageSize} />;
};

export default Caution;
