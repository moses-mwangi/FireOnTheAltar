import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { GrammarTopic } from "../types";

interface Props {
  topics: GrammarTopic[];
}

export default function GrammarSection({ topics }: Props) {
  const [expandedId, setExpandedId] = useState<string | null>(
    topics[0]?.id || null,
  );

  return (
    <div className="space-y-4">
      {topics.map((topic) => (
        <div
          key={topic.id}
          className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden"
        >
          <button
            onClick={() =>
              setExpandedId(expandedId === topic.id ? null : topic.id)
            }
            className="w-full p-6 text-left flex justify-between items-center hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
          >
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
              {topic.title}
            </h3>
            {expandedId === topic.id ? (
              <ChevronUp className="h-5 w-5 text-gray-500" />
            ) : (
              <ChevronDown className="h-5 w-5 text-gray-500" />
            )}
          </button>

          {expandedId === topic.id && (
            <div className="p-6 pt-0 border-t border-gray-200 dark:border-gray-700">
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                {topic.explanation}
              </p>

              <h4 className="font-semibold text-sm text-purple-600 dark:text-purple-400 mb-2">
                Examples:
              </h4>
              <ul className="space-y-2 mb-4">
                {topic.examples.map((example, idx) => (
                  <li
                    key={idx}
                    className="text-gray-600 dark:text-gray-400 text-sm pl-4 border-l-2 border-purple-300"
                  >
                    {example}
                  </li>
                ))}
              </ul>

              {topic.exercises && (
                <>
                  <h4 className="font-semibold text-sm text-purple-600 dark:text-purple-400 mb-2">
                    Practice:
                  </h4>
                  <ul className="space-y-2">
                    {topic.exercises.map((exercise, idx) => (
                      <li
                        key={idx}
                        className="text-gray-600 dark:text-gray-400 text-sm"
                      >
                        {exercise}
                      </li>
                    ))}
                  </ul>
                </>
              )}
            </div>
          )}
        </div>
      ))}

      {/* Add your own grammar notes */}
      <div className="bg-purple-50 dark:bg-gray-800 rounded-xl p-6 text-center">
        <p className="text-gray-600 dark:text-gray-400">
          ✨ Want to add your own grammar notes?
          <button className="ml-2 text-purple-600 hover:text-purple-700 font-medium">
            Create a new topic →
          </button>
        </p>
      </div>
    </div>
  );
}
