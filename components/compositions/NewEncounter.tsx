/** @jsx jsx */
import { useState, useMemo, useEffect } from "react";
import { jsx } from "@emotion/core";
import TemtemPortrait from "@maael/temtem-portrait-component";
import TemtemButton from "@maael/temtem-button-component";
import TemtemSelect from "@maael/temtem-select-component";
import { colors } from "@maael/temtem-theme";
import useFetch from "../../components/hooks/useFetch";
import useCallableFetch from "../../components/hooks/useCallableFetch";
import useJWT from "../../components/hooks/useJWT";
import RequireAuth from "../../components/primitives/RequireAuth";

export default function NewEncounter({
  existing,
  onSave
}: {
  existing?: any;
  onSave?: (data: any) => void;
}) {
  const jwt = useJWT();
  const [temtemName, setTemtemName] = useState(
    existing ? existing.temtemName : ""
  );
  const [location, setLocation] = useState(existing ? existing.location : "");
  const [trait, setTrait] = useState(existing ? existing.trait : "");
  const [isLuma, setIsLuma] = useState(existing ? existing.isLuma : false);
  const [wasCaught, setWasCaught] = useState(
    existing ? existing.wasCaught : false
  );
  const [tempOption, setTempOption] = useState<any>();
  const [locationOptions, setLocationOptions] = useState<any[]>([]);
  const [availableTemtem, loadingAvailableTemtem] = useFetch<any>(
    "/temtems",
    {},
    { source: "temtem-api", defaultValue: [] }
  );
  const [createEncounter] = useCallableFetch(
    `/db/encounters${existing ? `/${existing._id}` : ""}`,
    {
      method: existing ? "PUT" : "POST"
    }
  );
  const temtemOptions = useMemo(
    () => availableTemtem.map(({ name }) => ({ label: name, value: name })),
    [availableTemtem]
  );
  const selectedTemtem = useMemo(
    () => availableTemtem.find(({ name }) => name === temtemName),
    [availableTemtem, temtemName]
  );
  const availableTraits = useMemo(
    () =>
      selectedTemtem
        ? selectedTemtem.traits.map(t => ({ label: t, value: t }))
        : [],
    [selectedTemtem]
  );
  useEffect(() => {
    setLocationOptions(
      selectedTemtem
        ? [...new Set(selectedTemtem.locations.map(({ place }) => place))].map(
            p => ({ label: p, value: p })
          )
        : []
    );
  }, [selectedTemtem]);
  return (
    <>
      <div
        css={{
          maxWidth: 800,
          margin: "0 auto",
          padding: "0 10px",
          textAlign: "center"
        }}
      >
        <TemtemPortrait
          style={{ display: "inline-block", margin: "20px 0px 5px 0px" }}
          temtem={temtemName}
          shape="hexagon"
        />
        <div css={{ margin: "5px 0px" }}>
          <TemtemSelect
            placeholder="Temtem..."
            isLoading={loadingAvailableTemtem}
            options={temtemOptions}
            value={temtemOptions.find(({ value }) => value === temtemName)}
            onChange={option => {
              setTemtemName(option ? option.value : option);
            }}
            isClearable
          />
        </div>
        <div css={{ margin: "5px 0px" }}>
          <TemtemSelect
            placeholder="Location..."
            options={locationOptions
              .concat(
                tempOption &&
                  locationOptions.some(i => i.value === tempOption.value)
                  ? []
                  : tempOption
                  ? { label: tempOption.value, value: tempOption.value }
                  : undefined
              )
              .filter(Boolean)}
            value={locationOptions.find(({ value }) => value === location)}
            onChange={option => {
              setLocationOptions(s => {
                if (option === null || s.some(i => i.value === option.value))
                  return s;
                return s.concat({
                  label: option.value,
                  value: option.value
                } as any);
              });
              setLocation(option ? option.value : option);
              setTempOption(undefined);
            }}
            onInputChange={input => {
              if (input) {
                setTempOption({
                  label: `Create location "${input}"`,
                  value: input,
                  temp: true
                });
                setLocation(input);
              }
            }}
            noOptionsMessage={() => `No options, type to create one`}
            isClearable
          />
        </div>
        <div css={{ margin: "5px 0px 10px 0px" }}>
          <TemtemButton
            style={{ marginRight: 10 }}
            bgColor={isLuma ? colors.uiBlue : undefined}
            onClick={() => setIsLuma(l => !l)}
          >
            {isLuma ? "Luma  ✔" : "Is Luma?"}
          </TemtemButton>
          <TemtemButton
            bgColor={wasCaught ? colors.uiBlue : undefined}
            onClick={() => setWasCaught(c => !c)}
          >
            {wasCaught ? "Caught  ✔" : "Caught?"}
          </TemtemButton>
        </div>
        <div css={{ margin: "5px 0px" }}>
          <TemtemSelect
            placeholder="Trait..."
            isLoading={loadingAvailableTemtem}
            options={availableTraits}
            value={availableTraits.find(({ value }) => value === trait)}
            onChange={option => setTrait(option ? option.value : option)}
            isClearable
            noOptionsMessage={() =>
              temtemName
                ? `Don\'t know traits for ${temtemName}`
                : "Please choose a Temtem"
            }
          />
        </div>
        <RequireAuth>
          <div css={{ margin: "5px 0px" }}>
            <TemtemButton
              onClick={async () => {
                if (!temtemName) return;
                const data = {
                  userId: jwt && jwt._id,
                  temtemName,
                  location: location || null,
                  trait: trait || null,
                  isLuma,
                  wasCaught,
                  createdAt: existing ? existing.createdAt : undefined
                };
                await createEncounter({
                  body: JSON.stringify(data)
                });
                onSave && onSave(data);
              }}
              disabled={!temtemName}
            >
              Save
            </TemtemButton>
          </div>
        </RequireAuth>
      </div>
    </>
  );
}
