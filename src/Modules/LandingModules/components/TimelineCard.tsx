export default function TimelineCard({ lines }: { lines: string[] }) {
  return (
    <div className="text-center w-fit border px-4 py-2 text-bodyLarge font-josefin-sans rounded-lg glass shadow-xl max-xl:text-body-mobile max-lg:text-[12px] max-lg:px-2 max-lg:py-1">
      {lines.map((e, index) => (
        <h4 key={index}>{e}</h4>
      ))}
    </div>
  );
}
