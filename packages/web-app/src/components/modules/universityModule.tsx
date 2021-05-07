import { ClientUniversityDto } from "src/interfaces/clientUniversityDto";

export const UniversityModule = (props: ClientUniversityDto) => {
  return (
    <div>
      <h1>{props.title}</h1>
      <pre>{JSON.stringify(props, null, 4)}</pre>
    </div>
  );
};
