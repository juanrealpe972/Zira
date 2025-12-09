'use client';

import { useEffect, useState } from 'react';
import { getTasks, Task } from '@/lib/getTasks';
import { Card, CardContent, Typography } from '@mui/material';
import { AssignmentTurnedIn } from '@mui/icons-material';

export default function TasksPage() {
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    getTasks().then(setTasks);
  }, []);

  return (
    <section className="min-h-screen py-10">
      <div className="max-w-5xl mx-auto px-4">
        <div className="flex items-center gap-3 mb-8">
          <AssignmentTurnedIn className="text-blue-600" />
          <h2 className="text-3xl font-bold text-gray-800">Tareas Registradas</h2>
        </div>

        {tasks.length === 0 ? (
          <p className="text-center text-gray-500">No hay tareas disponibles por ahora.</p>
        ) : (
          <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {tasks.map((task) => (
              <Card key={task.id} className="hover:shadow-xl transition-shadow">
                <CardContent>
                  <Typography variant="h6" component="h3" className="text-blue-800 font-bold mb-2">
                    {task.title}
                  </Typography>
                  <Typography variant="body2" className="text-gray-600">
                    {task.descripcion}
                  </Typography>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
