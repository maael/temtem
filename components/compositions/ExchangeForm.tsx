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
  const [cost, setCost] = useState("");
  const [details, setDetails] = useState("");
  async function save() {
    const toSave = {
      type: "LISTING",
      temtemName: temtem ? temtem.value : gender,
      temtemGender: gender ? gender.value : gender,
      temtemFertility: parseInt(fertility, 10),
      temtemTrait: trait ? trait.value : trait,
      temtemBredTechniques: bredTechniques.map(({ value }) => value),
      temtemIsLuma: false,
      svHp: parseInt(hp, 10),
      svSta: parseInt(sta, 10),
      svSpd: parseInt(spd, 10),
      svAtk: parseInt(atk, 10),
      svDef: parseInt(def, 10),
      svSpatk: parseInt(spatk, 10),
      svSpdef: parseInt(spdef, 10),
      requestCost: parseInt(cost, 10),
      requestDetails: details
    };
    const res = await createListing({ body: JSON.stringify(toSave) });
    if (res) {
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
      setCost("");
      setDetails("");
    }
  }
  return (
    <div css={{ maxWidth: 800, textAlign: "center", margin: "0 auto" }}>
      <div
        css={{
          display: "flex",
          flexDirection: "column",
          "@media (min-width: 800px)": { flexDirection: "row" }
        }}
      >
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
      <div
        css={{
          display: "flex",
          flexDirection: "column",
          "@media (min-width: 800px)": { flexDirection: "row" }
        }}
      >
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
            prefix="Techniques"
            options={techniques}
            value={bredTechniques}
            onChange={selected => setBredTechniques(selected)}
            isLoading={loadingTechniques}
          />
        </div>
      </div>
      <div
        css={{
          margin: 5,
          display: "flex",
          flexDirection: "column",
          "@media (min-width: 800px)": { flexDirection: "row" }
        }}
      >
        <TemtemInput
          prefix="Fertility"
          containerStyle={{ flex: 1 }}
          type="number"
          value={fertility}
          onChange={({ target }) => setFertility((target as any).value)}
        />
      </div>
      <TemtemText style={{ fontSize: 20 }} borderWidth={10}>
        SVs
      </TemtemText>
      <div css={{ display: "flex", flexDirection: "column" }}>
        <TemtemInput
          containerStyle={{ margin: 5 }}
          prefix="HP"
          type="number"
          value={hp}
          onChange={({ target }) => setHp((target as any).value)}
        />
        <TemtemInput
          containerStyle={{ margin: 5 }}
          prefix="STA"
          type="number"
          value={sta}
          onChange={({ target }) => setSta((target as any).value)}
        />
        <TemtemInput
          containerStyle={{ margin: 5 }}
          prefix="SPD"
          type="number"
          value={spd}
          onChange={({ target }) => setSpd((target as any).value)}
        />
        <TemtemInput
          containerStyle={{ margin: 5 }}
          prefix="ATK"
          type="number"
          value={atk}
          onChange={({ target }) => setAtk((target as any).value)}
        />
        <TemtemInput
          containerStyle={{ margin: 5 }}
          prefix="DEF"
          type="number"
          value={def}
          onChange={({ target }) => setDef((target as any).value)}
        />
        <TemtemInput
          containerStyle={{ margin: 5 }}
          prefix="SPATK"
          type="number"
          value={spatk}
          onChange={({ target }) => setSpatk((target as any).value)}
        />
        <TemtemInput
          containerStyle={{ margin: 5 }}
          prefix="SPDEF"
          type="number"
          value={spdef}
          onChange={({ target }) => setSpdef((target as any).value)}
        />
      </div>
      <TemtemText style={{ fontSize: 20 }} borderWidth={10}>
        Request
      </TemtemText>
      <div css={{ display: "flex", flexDirection: "column" }}>
        <TemtemInput
          containerStyle={{ margin: 5 }}
          prefix="Pansuns"
          type="number"
          value={cost}
          onChange={({ target }) => setCost((target as any).value)}
        />
        <TemtemInput
          containerStyle={{ margin: 5 }}
          prefix="Details"
          value={details}
          onChange={({ target }) => setDetails((target as any).value)}
        />
      </div>
      {createError ? (
        <TemtemText
          containerStyle={{ margin: "10px 0" }}
          style={{ fontSize: 20 }}
        >{`Error: ${createError}`}</TemtemText>
      ) : null}
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
