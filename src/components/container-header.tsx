import { infoApp } from "@/utils/info";

export const ContainerHeader = () => {
  return (
    <div className="px-4 py-8 mx-auto max-w-4xl">
      <h1 className="font-bold text-4xl text-foreground">{infoApp.name}</h1>
      <p className="text-muted-foreground">{infoApp.title}</p>
    </div>
  );
};
