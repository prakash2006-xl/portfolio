import { useState } from 'react'
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core'
import type { DragEndEvent } from '@dnd-kit/core'
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
  useSortable,
} from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'

const initialSections = [
  { id: '1', name: 'Hero', visible: true },
  { id: '2', name: 'About', visible: true },
  { id: '3', name: 'Skills', visible: true },
  { id: '4', name: 'Projects', visible: true },
]

const SortableItem = ({ id, name, visible }: { id: string, name: string, visible: boolean }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({ id })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="flex items-center justify-between bg-[#18181b] border border-white/10 rounded-lg p-4 mb-3"
    >
      <div className="flex items-center gap-4">
        <div {...attributes} {...listeners} className="cursor-grab text-gray-500 hover:text-white">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 8h16M4 16h16"></path></svg>
        </div>
        <span className="font-medium text-lg">{name}</span>
      </div>
      <div>
        <button className={`px-4 py-1.5 rounded-md text-sm font-medium transition-colors ${visible ? 'bg-primary/20 text-primary border border-primary/30' : 'bg-white/5 text-gray-400 border border-white/10'}`}>
          {visible ? 'Visible' : 'Hidden'}
        </button>
      </div>
    </div>
  )
}

export const SectionEditor = () => {
  const [sections, setSections] = useState(initialSections)

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  )

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event

    if (over && active.id !== over.id) {
      setSections((items) => {
        const oldIndex = items.findIndex(item => item.id === active.id)
        const newIndex = items.findIndex(item => item.id === over.id)
        return arrayMove(items, oldIndex, newIndex)
      })
    }
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-display font-bold text-white">Section Editor</h1>
        <button className="bg-primary text-background font-bold px-6 py-2 rounded-lg hover:bg-primary/80 transition-colors">
          Save Changes
        </button>
      </div>
      <p className="text-gray-400 mb-6">Drag and drop to reorder the sections on your public portfolio.</p>
      
      <div className="max-w-3xl">
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          <SortableContext
            items={sections}
            strategy={verticalListSortingStrategy}
          >
            {sections.map((section) => (
              <SortableItem key={section.id} id={section.id} name={section.name} visible={section.visible} />
            ))}
          </SortableContext>
        </DndContext>
      </div>
    </div>
  )
}
