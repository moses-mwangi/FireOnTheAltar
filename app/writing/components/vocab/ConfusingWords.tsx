// "use client";

// import { useState } from "react";
// import { HelpCircle } from "lucide-react";
// import { Card, CardTitle } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import { Separator } from "@/components/ui/separator";

// type ConfusingPair = {
//   id: string;
//   word1: string;
//   word2: string;
//   meaning1: string;
//   meaning2: string;
//   example1: string;
//   example2: string;
// };

// const defaultPairs: ConfusingPair[] = [
//   {
//     id: "1",
//     word1: "Affect",
//     word2: "Effect",
//     meaning1: "To influence something",
//     meaning2: "The result of something",
//     example1: "The weather can affect your mood.",
//     example2: "The medicine had a great effect.",
//   },
//   {
//     id: "2",
//     word1: "Then",
//     word2: "Than",
//     meaning1: "At that time / next",
//     meaning2: "Comparison",
//     example1: "I ate breakfast, then went to work.",
//     example2: "She is taller than me.",
//   },
//   {
//     id: "3",
//     word1: "There",
//     word2: "Their",
//     meaning1: "A place",
//     meaning2: "Belongs to them",
//     example1: "The book is over there.",
//     example2: "That is their car.",
//   },
//   {
//     id: "4",
//     word1: "Lose",
//     word2: "Loose",
//     meaning1: "To misplace or fail to win",
//     meaning2: "Not tight",
//     example1: "Don't lose your keys.",
//     example2: "This shirt is too loose.",
//   },
//   {
//     id: "5",
//     word1: "Accept",
//     word2: "Except",
//     meaning1: "To receive",
//     meaning2: "To exclude",
//     example1: "I accept your apology.",
//     example2: "Everyone except John came.",
//   },
// ];

// export default function ConfusingWords() {
//   const [selectedPair, setSelectedPair] = useState<ConfusingPair | null>(null);

//   const nextPair = () => {
//     const currentIndex = defaultPairs.findIndex(
//       (p) => p.id === selectedPair?.id,
//     );
//     const nextIndex = (currentIndex + 1) % defaultPairs.length;
//     setSelectedPair(defaultPairs[nextIndex]);
//   };

//   const selectPair = (pair: ConfusingPair) => {
//     setSelectedPair(pair);
//   };

//   return (
//     <div className="bg-white dark:bg-gray-800 shadow-lg overflow-hidden">
//       <div className="flex justify-between items-center w-full px-4 py-4">
//         <h1 className="text-xl font-bold">Confusing Words</h1>
//         <Button
//           // onClick={() => setOpenAddModal(true)}
//           className="px-3 cursor-pointer h-[31px] text-sm bg-blue-500 text-white hover:bg-blue-600 transition-all"
//         >
//           + Add Words
//         </Button>
//       </div>
//       <Separator />
//       <div className="p-6">
//         {/* Word List */}
//         <div className="mb-6">
//           <h3 className="text-sm font-semibold text-gray-500 mb-3">
//             Choose a pair:
//           </h3>
//           <div className="flex flex-wrap gap-2">
//             {defaultPairs.map((pair) => (
//               <button
//                 key={pair.id}
//                 onClick={() => selectPair(pair)}
//                 className={`rounded-2xl px-4 py-2 text-sm font-medium cursor-pointer transition-all text-left ${
//                   selectedPair?.id === pair.id
//                     ? "bg-purple-600 text-white"
//                     : "bg-gray-100 hover:bg-gray-200"
//                 }`}
//               >
//                 {pair.word1} / {pair.word2}
//               </button>
//             ))}
//           </div>
//         </div>

//         {selectedPair && (
//           <div className="space-y-6">
//             {/* Word Cards */}
//             <div className="grid md:grid-cols-2 gap-4">
//               <Card className="px-4">
//                 <h3 className="text-xl font-bold text-purple-600">
//                   {selectedPair.word1}
//                 </h3>
//                 <p className="text-sm text-gray-600">{selectedPair.meaning1}</p>
//                 <p className="text-sm italic text-gray-500">
//                   &quot;{selectedPair.example1}&quot;
//                 </p>
//               </Card>

//               <Card className="px-4">
//                 <h3 className="text-xl font-bold text-blue-600">
//                   {selectedPair.word2}
//                 </h3>
//                 <span className="text-sm text-gray-600">
//                   {selectedPair.meaning2}
//                 </span>
//                 <span className="text-sm italic text-gray-500">
//                   &quot;{selectedPair.example2}&quot;
//                 </span>
//               </Card>
//             </div>

//             {/* Next Button */}
//             <Button onClick={nextPair} className="w-full">
//               Next Pair →
//             </Button>
//           </div>
//         )}

//         {!selectedPair && (
//           <div className="text-center py-12 text-gray-500">
//             <HelpCircle className="h-12 w-12 mx-auto mb-3 opacity-50" />
//             <p>Select a word pair to start learning</p>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

"use client";

import { useState } from "react";
import { HelpCircle, Pencil, Trash2 } from "lucide-react";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";

type ConfusingPair = {
  id: string;
  word1: string;
  word2: string;
  meaning1: string;
  meaning2: string;
  example1: string;
  example2: string;
};

const defaultPairs: ConfusingPair[] = [
  {
    id: "1",
    word1: "Affect",
    word2: "Effect",
    meaning1: "To influence something",
    meaning2: "The result of something",
    example1: "The weather can affect your mood.",
    example2: "The medicine had a great effect.",
  },
  {
    id: "2",
    word1: "Then",
    word2: "Than",
    meaning1: "At that time / next",
    meaning2: "Comparison",
    example1: "I ate breakfast, then went to work.",
    example2: "She is taller than me.",
  },
];

export default function ConfusingWords() {
  const [pairs, setPairs] = useState(defaultPairs);

  const [selectedPair, setSelectedPair] = useState<ConfusingPair | null>(null);

  const [openAddModal, setOpenAddModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);

  const emptyForm: ConfusingPair = {
    id: "",
    word1: "",
    word2: "",
    meaning1: "",
    meaning2: "",
    example1: "",
    example2: "",
  };

  const [formData, setFormData] = useState<ConfusingPair>(emptyForm);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // ---------------- ADD ----------------

  const handleAdd = () => {
    const newPair = {
      ...formData,
      id: Date.now().toString(),
    };

    setPairs((prev) => [...prev, newPair]);
    setFormData(emptyForm);
    setOpenAddModal(false);
  };

  // ---------------- EDIT ----------------

  const openEdit = (pair: ConfusingPair) => {
    setFormData(pair);
    setOpenEditModal(true);
  };

  const handleEdit = () => {
    const updated = pairs.map((pair) =>
      pair.id === formData.id ? formData : pair,
    );

    setPairs(updated);

    if (selectedPair?.id === formData.id) {
      setSelectedPair(formData);
    }

    setOpenEditModal(false);
  };

  // ---------------- DELETE ----------------

  const handleDelete = () => {
    if (!selectedPair) return;

    const filtered = pairs.filter((pair) => pair.id !== selectedPair.id);

    setPairs(filtered);
    setSelectedPair(null);
    setOpenDeleteModal(false);
  };

  // ---------------- NEXT ----------------

  const nextPair = () => {
    if (!selectedPair) return;

    const currentIndex = pairs.findIndex((p) => p.id === selectedPair.id);

    const nextIndex = (currentIndex + 1) % pairs.length;

    setSelectedPair(pairs[nextIndex]);
  };

  return (
    <>
      <div className="bg-white dark:bg-gray-800 shadow-lg overflow-hidden rounded-2xl">
        {/* HEADER */}
        <div className="flex justify-between items-center w-full px-4 py-4">
          <h1 className="text-xl font-bold">Confusing Words</h1>

          <Button
            onClick={() => {
              setFormData(emptyForm);
              setOpenAddModal(true);
            }}
            className="px-3 cursor-pointer h-[31px] text-sm bg-blue-500 text-white hover:bg-blue-600"
          >
            + Add Words
          </Button>
        </div>

        <Separator />

        <div className="p-6">
          {/* WORD LIST */}
          <div className="mb-6">
            <h3 className="text-sm font-semibold text-gray-500 mb-3">
              Choose a pair:
            </h3>

            <div className="flex flex-wrap gap-2">
              {pairs.map((pair) => (
                <button
                  key={pair.id}
                  onClick={() => setSelectedPair(pair)}
                  className={`rounded-2xl px-4 py-2 text-sm font-medium cursor-pointer transition-all ${
                    selectedPair?.id === pair.id
                      ? "bg-purple-600 text-white"
                      : "bg-gray-100 hover:bg-gray-200"
                  }`}
                >
                  {pair.word1} / {pair.word2}
                </button>
              ))}
            </div>
          </div>

          {/* CONTENT */}
          {selectedPair ? (
            <div className="space-y-6">
              {/* ACTION BUTTONS */}
              <div className="flex gap-2 justify-end">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => openEdit(selectedPair)}
                >
                  <Pencil className="w-4 h-4 mr-2" />
                  Edit
                </Button>

                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => setOpenDeleteModal(true)}
                >
                  <Trash2 className="w-4 h-4 mr-2" />
                  Delete
                </Button>
              </div>

              {/* WORD CARDS */}
              <div className="grid md:grid-cols-2 gap-4">
                <Card className="p-5 rounded-2xl">
                  <div className="space-y-3">
                    <h3 className="text-2xl font-bold text-purple-600">
                      {selectedPair.word1}
                    </h3>

                    <p className="text-sm text-gray-600">
                      {selectedPair.meaning1}
                    </p>

                    <div className="bg-gray-100 rounded-xl p-3">
                      <p className="italic text-sm text-gray-600">
                        "{selectedPair.example1}"
                      </p>
                    </div>
                  </div>
                </Card>

                <Card className="p-5 rounded-2xl">
                  <div className="space-y-3">
                    <h3 className="text-2xl font-bold text-blue-600">
                      {selectedPair.word2}
                    </h3>

                    <p className="text-sm text-gray-600">
                      {selectedPair.meaning2}
                    </p>

                    <div className="bg-gray-100 rounded-xl p-3">
                      <p className="italic text-sm text-gray-600">
                        "{selectedPair.example2}"
                      </p>
                    </div>
                  </div>
                </Card>
              </div>

              {/* NEXT */}
              <Button onClick={nextPair} className="w-full">
                Next Pair →
              </Button>
            </div>
          ) : (
            <div className="text-center py-12 text-gray-500">
              <HelpCircle className="h-12 w-12 mx-auto mb-3 opacity-50" />
              <p>Select a word pair to start learning</p>
            </div>
          )}
        </div>
      </div>

      {/* ADD MODAL */}
      <Dialog open={openAddModal} onOpenChange={setOpenAddModal}>
        <DialogContent className="min-w-2xl">
          <DialogHeader>
            <DialogTitle>Add Confusing Words</DialogTitle>
          </DialogHeader>

          <div className="grid grid-cols-2 gap-4 py-4">
            <Input
              name="word1"
              placeholder="Word 1"
              value={formData.word1}
              onChange={handleChange}
            />

            <Input
              name="word2"
              placeholder="Word 2"
              value={formData.word2}
              onChange={handleChange}
            />

            <Input
              name="meaning1"
              placeholder="Meaning 1"
              value={formData.meaning1}
              onChange={handleChange}
            />

            <Input
              name="meaning2"
              placeholder="Meaning 2"
              value={formData.meaning2}
              onChange={handleChange}
            />

            <Textarea
              name="example1"
              placeholder="Example 1"
              value={formData.example1}
              onChange={handleChange}
            />

            <Textarea
              name="example2"
              placeholder="Example 2"
              value={formData.example2}
              onChange={handleChange}
            />
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setOpenAddModal(false)}>
              Cancel
            </Button>

            <Button
              className="bg-blue-500 hover:bg-blue-500/80"
              onClick={handleAdd}
            >
              Add Pair
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* EDIT MODAL */}
      <Dialog open={openEditModal} onOpenChange={setOpenEditModal}>
        <DialogContent className="min-w-2xl">
          <DialogHeader>
            <DialogTitle>Edit Pair==</DialogTitle>
          </DialogHeader>

          <div className="grid grid-cols-2 gap-4 py-4">
            <Input
              name="word1"
              value={formData.word1}
              onChange={handleChange}
            />

            <Input
              name="word2"
              value={formData.word2}
              onChange={handleChange}
            />

            <Input
              name="meaning1"
              value={formData.meaning1}
              onChange={handleChange}
            />

            <Input
              name="meaning2"
              value={formData.meaning2}
              onChange={handleChange}
            />

            <Textarea
              name="example1"
              value={formData.example1}
              onChange={handleChange}
            />

            <Textarea
              name="example2"
              value={formData.example2}
              onChange={handleChange}
            />
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setOpenEditModal(false)}>
              Cancel
            </Button>

            <Button
              className="bg-blue-500 hover:bg-blue-500/80"
              onClick={handleEdit}
            >
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* DELETE MODAL */}
      <Dialog open={openDeleteModal} onOpenChange={setOpenDeleteModal}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Delete Pair</DialogTitle>
          </DialogHeader>

          <div className="py-4">
            <p className="text-sm text-muted-foreground">
              Are you sure you want to delete this confusing pair?
            </p>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setOpenDeleteModal(false)}>
              Cancel
            </Button>

            <Button variant="destructive" onClick={handleDelete}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
