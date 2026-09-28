import InformationalPage from "@/components/InformationalPage";
import { generatePageMetadata } from "@/lib/seo";

export const metadata = generatePageMetadata({
  title: "पूजा मुहूर्त | उज्जैन",
  description:
    "पूजा, अनुष्ठान और धार्मिक सेवाओं के लिए तिथि एवं मुहूर्त संबंधी पारंपरिक मार्गदर्शन प्राप्त करें।",
  path: "/puja-muhurat",
});

export default function PujaMuhuratPage() {
  return (
    <InformationalPage
      eyebrow="तिथि • समय • संकल्प"
      title="पूजा मुहूर्त"
      description="हर पूजा और अनुष्ठान के लिए तिथि एवं समय का अपना पारंपरिक महत्व होता है। अपनी आवश्यकता, पूजा के प्रकार और पसंदीदा तिथि साझा करें ताकि उपलब्धता एवं परंपरागत संदर्भ के अनुसार उचित समय पर चर्चा की जा सके।"
      points={[
        "अपनी पसंदीदा तिथि और पूजा का प्रकार साझा करें",
        "पूजा एवं अनुष्ठान के अनुसार समय संबंधी चर्चा",
        "स्थान और उपलब्धता के आधार पर व्यवस्था की पुष्टि",
        "परंपरागत संदर्भ में मुहूर्त संबंधी मार्गदर्शन",
        "आवश्यक पूजा सामग्री एवं प्रक्रिया की जानकारी",
      ]}
      primaryLabel="पूजा अनुरोध भेजें"
      primaryHref="/online-puja"
      secondaryLabel="परामर्श प्राप्त करें"
      secondaryHref="/book-consultation"
      notice="मुहूर्त एवं उपलब्धता की अंतिम पुष्टि संपर्क के बाद की जाती है। किसी विशेष तिथि या समय की उपलब्धता पहले से सुनिश्चित नहीं मानी जाती।"
    />
  );
}