import { useState } from "react";
import TemtemInput from "@maael/temtem-input-component";

export default function UsersSearch() {
  const [search, setSearch] = useState("");
  return (
    <div css={{ marginTop: 10 }}>
      <TemtemInput
        containerStyle={{ maxWidth: 600, margin: "0 auto" }}
        placeholder="Search users..."
        value={search}
        onChange={e => setSearch((e.target as any).value)}
      />
    </div>
  );
}
