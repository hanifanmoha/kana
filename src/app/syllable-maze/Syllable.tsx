interface SyllableProps {
  syllable: string;
  options: string[];
  onClick: (syllable: string) => void;
}


export default function Syllable({ syllable, options, onClick }: SyllableProps) {
  return (
    <div className="text-center mt-8">
      <h1 className="text-4xl font-bold mb-8">{syllable}</h1>
      <div className="flex">
        {options.map(option => (
          <button
            key={option}
            className="mx-2 mb-4 border cursor-pointer rounded-md bg-white hover:bg-gray-100 disabled:opacity-50 text-black py-2 px-4"
            onClick={() => onClick(option)}
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );
}


