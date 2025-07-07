export default function TimelineCardMobile({ lines }: { lines: string[] }) {
  return (
    <div className="text-center w-fit border px-4 py-2 text-bodyLarge-mobile font-josefin-sans rounded-lg glass shadow-xl">
      {lines.map((e, index) => (
        <h4 key={index}>{e}</h4>
      ))}
    </div>
  );
}
