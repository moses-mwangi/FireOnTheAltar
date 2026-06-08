"use client";

import { useEffect, useState } from "react";
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

export default function ConfusingWords() {
  const [pairs, setPairs] = useState<ConfusingPair[]>([]);
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

  const getConfusedWord = async () => {
    try {
      const response = await fetch("/api/confuse");
      if (!response.ok)
        throw new Error("Failed to load common vocabulary data");
      const data = await response.json();
      console.log(data.words);
      setPairs(data.words || []);
    } catch (err) {
      console.error(err);
    } finally {
    }
  };

  useEffect(() => {
    getConfusedWord();

    return () => {
      if (window.speechSynthesis) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // ---------------- ADD ----------------

  const handleAdd = async () => {
    const newPair = {
      ...formData,
      id: Date.now().toString(),
    };
    console.log({ words: newPair });

    try {
      const response = await fetch("/api/confuse", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          word: newPair,
        }),
      });
      if (!response.ok)
        throw new Error("Failed to load common vocabulary data");
      setPairs((prev) => [...prev, newPair]);
      const data = await response.json();
      setPairs(data.words || []);
      setFormData(emptyForm);
      setOpenAddModal(false);
    } catch (err) {
      console.error(err);
    } finally {
    }
  };

  // ---------------- EDIT ----------------

  const openEdit = (pair: ConfusingPair) => {
    setFormData(pair);
    setOpenEditModal(true);
  };

  // ---------------- EDIT ----------------

  const handleEdit = async () => {
    try {
      const response = await fetch("/api/confuse", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: formData.id,
          updatedWord: formData,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to update pair");
      }

      const data = await response.json();

      setPairs(data.words || []);

      if (selectedPair?.id === formData.id) {
        setSelectedPair(formData);
      }

      setOpenEditModal(false);

      setFormData(emptyForm);
    } catch (err) {
      console.error(err);
    }
  };

  // ---------------- DELETE ----------------

  // ---------------- DELETE ----------------

  const handleDelete = async () => {
    if (!selectedPair) return;

    try {
      const response = await fetch("/api/confuse", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: selectedPair.id,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to delete pair");
      }

      const data = await response.json();

      setPairs(data.words || []);

      setSelectedPair(null);

      setOpenDeleteModal(false);
    } catch (err) {
      console.error(err);
    }
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
              Are you sure you want to delete
              <span className="font-semibold px-2">
                {selectedPair?.word1} / {selectedPair?.word2}
              </span>
              ?
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
