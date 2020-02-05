import { useState } from "react";
import Link from "next/link";
import TemtemInput from "@maael/temtem-input-component";
import TemtemText from "@maael/temtem-text-component";
import useFetch from "../components/hooks/useFetch";
import { colors } from "@maael/temtem-theme";

export default function UsersSearch() {
  const [search, setSearch] = useState("");
  const [users] = useFetch<any[]>(
    "/db/user",
    {},
    {
      source: "local",
      defaultValue: [],
      mapper: d => d.data
    }
  );
  return (
    <div css={{ marginTop: 10 }}>
      <TemtemInput
        containerStyle={{ maxWidth: 600, margin: "0 auto" }}
        placeholder={`Search ${users.length} users...`}
        value={search}
        onChange={e => setSearch((e.target as any).value)}
      />
      <div
        css={{ display: "flex", justifyContent: "center", padding: "10px 0" }}
      >
        {users
          .filter(u =>
            u.redditName.toLowerCase().includes(search.toLowerCase())
          )
          .map(user => (
            <div
              key={user._id}
              css={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center"
              }}
            >
              <img
                css={{
                  border: `2px solid ${colors.uiBlueFaded}`,
                  height: 30,
                  width: 30,
                  borderRadius: "50%",
                  margin: "0px 5px"
                }}
                src={user.redditIcon}
              />
              <Link href="/user/[name]" as={`/user/${user.redditName}`}>
                <a css={{ textDecoration: "none", cursor: "pointer" }}>
                  <TemtemText containerStyle={{ marginRight: 5 }}>
                    {user.redditName}
                  </TemtemText>
                </a>
              </Link>
            </div>
          ))}
      </div>
    </div>
  );
}
