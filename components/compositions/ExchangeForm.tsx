/** @jsx jsx */
import { jsx } from "@emotion/core";
import { useState } from "react";
import TemtemInput from "@maael/temtem-input-component";
import TemtemText from "@maael/temtem-text-component";
import TemtemSelect from "@maael/temtem-select-component";
import TemtemButton from "@maael/temtem-button-component";
import { colors } from "@maael/temtem-theme";
import useFetch from "../hooks/useFetch";
import useCallableFetch from "../hooks/useCallableFetch";

function useApiState(path: string) {
  const [data, loading, error] = useFetch<{ label: string; value: string }[]>(
    path,
    {},
    {
      source: "temtem-api",
      mapper: v => v.map(({ name }) => ({ label: name, value: name }))
    }
  );
  return [data, loading, error];
}

export default function ExchangeForm() {
  const [createListing, _, createLoading, createError] = useCallableFetch(
    "/db/exchange/listings",
    {
      method: "POST"
    }
  );
  const [temtems, loadingTemtems] = useApiState("/temtems");
  const [traits, loadingTraits] = useApiState("/traits");
  const [techniques, loadingTechniques] = useApiState("/techniques");
  const [temtem, setTemtem] = useState();
  const [gender, setGender] = useState();
  const [trait, setTrait] = useState();
  const [bredTechniques, setBredTechniques] = useState([]);
  const [fertility, setFertility] = useState("");
  const [hp, setHp] = useState("");
  const [sta, setSta] = useState("");
  const [spd, setSpd] = useState("");
  const [atk, setAtk] = useState("");
  const [def, setDef] = useState("");
  const [spatk, setSpatk] = useState("");
  const [spdef, setSpdef] = useState("");
  async function save() {
    const toSave = {
      temtem: temtem ? temtem.value : gender,
      gender: gender ? gender.value : gender,
      trait: trait ? trait.value : trait,
      bredTechniques: bredTechniques.map(({ value }) => value),
      fertility,
      hp: parseInt(hp, 10),
      sta: parseInt(sta, 10),
      spd: parseInt(spd, 10),
      atk: parseInt(atk, 10),
      def: parseInt(def, 10),
      spatk: parseInt(spatk, 10),
      spdef: parseInt(spdef, 10)
    };
    console.info(toSave);
    await createListing({ body: JSON.stringify(toSave) });
    console.info("save successful");
    setTemtem("");
    setGender("");
    setTrait("");
    setBredTechniques([]);
    setFertility("");
    setHp("");
    setSta("");
    setSpd("");
    setAtk("");
    setDef("");
    setSpatk("");
    setSpdef("");
  }
  return (
    <div css={{ maxWidth: 800, textAlign: "center", margin: "0 auto" }}>
      <div css={{ display: "flex", flexDirection: "row" }}>
        <div css={{ margin: 5, flex: 2 }}>
          <TemtemSelect
            prefix="Temtem"
            options={temtems}
            value={temtem}
            onChange={selected => setTemtem(selected)}
            isLoading={loadingTemtems}
          />
        </div>
        <div css={{ margin: 5, flex: 1 }}>
          <TemtemSelect
            prefix="Gender"
            options={[
              { value: "MALE", label: "Male" },
              { value: "FEMALE", label: "Female" }
            ]}
            value={gender}
            onChange={selected => setGender(selected)}
          />
        </div>
      </div>
      <div css={{ display: "flex", flexDirection: "row" }}>
        <div css={{ margin: 5, flex: 1 }}>
          <TemtemSelect
            prefix="Trait"
            options={traits}
            value={trait}
            onChange={selected => setTrait(selected)}
            isLoading={loadingTraits}
          />
        </div>
        <div css={{ margin: 5, flex: 1 }}>
          <TemtemSelect
            isMulti
            prefix="Bred Techniques"
            options={techniques}
            value={bredTechniques}
            onChange={selected => setBredTechniques(selected)}
            isLoading={loadingTechniques}
          />
        </div>
      </div>
      <TemtemInput
        prefix="Fertility"
        style={{ flex: 1 }}
        type="number"
        value={fertility}
        onChange={({ target }) => setFertility((target as any).value)}
      />
      <TemtemText style={{ fontSize: 20 }} borderWidth={10}>
        SVs
      </TemtemText>
      <div css={{ textAlign: "center" }}>
        <TemtemInput
          containerStyle={{ display: "inline-block", margin: 5 }}
          prefix="HP"
          type="number"
          value={hp}
          onChange={({ target }) => setHp((target as any).value)}
        />
        <TemtemInput
          containerStyle={{ display: "inline-block", margin: 5 }}
          prefix="STA"
          type="number"
          value={sta}
          onChange={({ target }) => setSta((target as any).value)}
        />
        <TemtemInput
          containerStyle={{ display: "inline-block", margin: 5 }}
          prefix="SPD"
          type="number"
          value={spd}
          onChange={({ target }) => setSpd((target as any).value)}
        />
        <TemtemInput
          containerStyle={{ display: "inline-block", margin: 5 }}
          prefix="ATK"
          type="number"
          value={atk}
          onChange={({ target }) => setAtk((target as any).value)}
        />
        <TemtemInput
          containerStyle={{ display: "inline-block", margin: 5 }}
          prefix="DEF"
          type="number"
          value={def}
          onChange={({ target }) => setDef((target as any).value)}
        />
        <TemtemInput
          containerStyle={{ display: "inline-block", margin: 5 }}
          prefix="SPATK"
          type="number"
          value={spatk}
          onChange={({ target }) => setSpatk((target as any).value)}
        />
        <TemtemInput
          containerStyle={{ display: "inline-block", margin: 5 }}
          prefix="SPDEF"
          type="number"
          value={spdef}
          onChange={({ target }) => setSpdef((target as any).value)}
        />
      </div>
      <TemtemButton
        type={"" as any}
        disabled={createLoading}
        bgColor={colors.uiBlue}
        onClick={save}
      >
        {createLoading ? "Saving" : "Save"}
      </TemtemButton>
    </div>
  );
}
