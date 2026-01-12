export const taskCategoriesList = [
    {
        id: 1,
        name: 'School',
        tasks: [
            { id: 's1', name: 'Submit final essay draft', dateCreated: '2025-12-28', dateDue: '2026-01-20', completed: false },
            { id: 's2', name: 'Study for history quiz', dateCreated: '2026-01-10', dateDue: '2026-01-12', completed: true }, // ✅ DONE (TODAY)
            { id: 's3', name: 'Review math homework', dateCreated: '2026-01-05', dateDue: '2026-01-10', completed: false }, // 🔴 OVERDUE
            { id: 's4', name: 'Email professor about extension', dateCreated: '2026-01-11', dateDue: '2026-01-13', completed: false }, // ⏳ DUE SOON
        ]
    },
    {
        id: 2,
        name: 'Work',
        tasks: [
            { id: 'w1', name: 'Review Q4 budget proposal', dateCreated: '2026-01-01', dateDue: '2026-01-15', completed: false },
            { id: 'w2', name: 'Schedule team meeting', dateCreated: '2026-01-12', dateDue: '2026-01-12', completed: true }, // ✅ DONE (TODAY)
            { id: 'w4', name: 'Submit vacation request form', dateCreated: '2026-01-01', dateDue: '2026-01-08', completed: false }, // 🔴 OVERDUE
            { id: 'w5', name: 'Prepare Q1 presentation slides', dateCreated: '2026-01-08', dateDue: '2026-01-14', completed: false }, // ⏳ DUE SOON
        ]
    },
    {
        id: 3,
        name: 'Personal',
        tasks: [
            { id: 'p1', name: 'Call dentist for appointment', dateCreated: '2026-01-10', dateDue: '2026-01-14', completed: false }, // ⏳ DUE SOON
            { id: 'p2', name: 'Buy groceries', dateCreated: '2026-01-12', dateDue: '2026-01-12', completed: true }, // ✅ DONE (TODAY)
            { id: 'p4', name: 'Book haircut', dateCreated: '2026-01-05', dateDue: '2026-01-11', completed: false }, // 🔴 OVERDUE
        ]
    },
    {
        id: 4,
        name: 'Fitness',
        tasks: [
            { id: 'f4', name: 'Plan next week\'s workouts', dateCreated: '2026-01-10', dateDue: '2026-01-12', completed: false }, // 🎯 DUE TODAY
            { id: 'f5', name: 'Morning yoga session', dateCreated: '2026-01-12', dateDue: '2026-01-12', completed: true }, // ✅ DONE (TODAY)
            { id: 'f8', name: 'Buy protein powder', dateCreated: '2026-01-01', dateDue: '2026-01-09', completed: false }, // 🔴 OVERDUE
        ]
    },
    {
        id: 5,
        name: 'Financial',
        tasks: [
            { id: 'fn5', name: 'Pay monthly bills', dateCreated: '2026-01-05', dateDue: '2026-01-12', completed: true }, // ✅ DONE (TODAY)
            { id: 'fn6', name: 'Review investment portfolio', dateCreated: '2026-01-10', dateDue: '2026-01-15', completed: false },
        ]
    },
    {
        id: 6,
        name: 'Home Chores',
        tasks: [
            { id: 'h6', name: 'Clean kitchen countertops', dateCreated: '2026-01-12', dateDue: '2026-01-12', completed: false }, // 🎯 DUE TODAY
            { id: 'h7', name: 'Laundry day', dateCreated: '2026-01-09', dateDue: '2026-01-10', completed: true }, // ✅ DONE (OVERDUE)
            { id: 'h8', name: 'Fix the leaky faucet', dateCreated: '2026-01-01', dateDue: '2026-01-14', completed: false }, // ⏳ DUE SOON
        ]
    },
    {
        id: 7,
        name: 'Health',
        tasks: [
            { id: 'hl8', name: 'Refill prescription', dateCreated: '2026-01-08', dateDue: '2026-01-12', completed: false }, // 🎯 DUE TODAY
            { id: 'hl9', name: 'Vitamin intake', dateCreated: '2026-01-12', dateDue: '2026-01-12', completed: true }  // ✅ DONE (TODAY)
        ]
    },
    {
        id: 8,
        name: 'Hobby',
        tasks: [
            { id: 'hb9', name: 'Practice guitar scales', dateCreated: '2026-01-12', dateDue: '2026-01-12', completed: false }, // 🎯 DUE TODAY
            { id: 'hb10', name: 'Finish reading current book', dateCreated: '2025-12-20', dateDue: '2026-01-11', completed: true } // ✅ DONE
        ]
    },
    {
        id: 9,
        name: 'Learning',
        tasks: [
            { id: 'lr14', name: 'Watch CSS tutorial', dateCreated: '2026-01-12', dateDue: '2026-01-12', completed: true }, // ✅ DONE
            { id: 'lr15', name: 'API Security reading', dateCreated: '2026-01-10', dateDue: '2026-01-15', completed: false } // ⏳ DUE SOON
        ]
    },
    {
        id: 10,
        name: 'Reminders',
        tasks: [
            { id: 'rm15', name: 'Charge laptop battery', dateCreated: '2026-01-12', dateDue: '2026-01-12', completed: true }, // ✅ DONE
            { id: 'rm16', name: 'Take out the trash', dateCreated: '2026-01-12', dateDue: '2026-01-12', completed: false }  // 🎯 DUE TODAY
        ]
    }
];