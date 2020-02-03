import { useRouter } from "next/router";
import TemtemText from "@maael/temtem-text-component";

export default function UserPage(props) {
  const router = useRouter();
  return (
    <div css={{ textAlign: "center" }}>
      <TemtemText style={{ fontSize: 40 }} borderWidth={10}>
        {router.query.name as string}
      </TemtemText>
    </div>
  );
}
