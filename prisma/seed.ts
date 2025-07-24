import {
  PrismaClient,
  TipeTugas,
  JalurMasuk,
  Jurusan,
  Gender,
  Role,
} from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Starting seed...");

  // Clear existing data in correct order to avoid foreign key constraints
  //   await prisma.submisi.deleteMany();
  //   await prisma.tugas.deleteMany();
  //   await prisma.kelompokUser.deleteMany();
  //   await prisma.kelompok.deleteMany();
  //   await prisma.user.deleteMany();

  console.log("🗑️  Cleared existing data");

  // Create mentor user
  const mentor = await prisma.user.create({
    data: {
      name: "Mentor John Doe",
      email: "mentor@example.com",
      emailVerified: true,
      fillDetails: true,
      gender: Gender.Male,
      NPM: "2206000001",
      idLine: "mentor_john",
      idDiscord: "mentorjohn#1234",
      jalurMasuk: JalurMasuk.SNBP,
      jurusan: Jurusan.IlmuKomputer,
      asalSekolah: "SMA Negeri 1 Jakarta",
      role: Role.Mentor,
    },
  });

  // Create mentee users (matching the names from Lab.tsx)
  const menteeData = [
    {
      name: "Andrew Sanjay Hasian Panjaitan",
      email: "andrew@example.com",
      NPM: "2206000002",
      idLine: "andrew_sanjay",
      idDiscord: "andrew#1234",
    },
    {
      name: "Vazha Khayri",
      email: "vazha@example.com",
      NPM: "2206000003",
      idLine: "vazha_khayri",
      idDiscord: "vazha#1234",
    },
    {
      name: "Muhamad Hakim Nizami",
      email: "hakim@example.com",
      NPM: "2206000004",
      idLine: "hakim_nizami",
      idDiscord: "hakim#1234",
    },
    {
      name: "Naufal Zafran Fadil",
      email: "naufal@example.com",
      NPM: "2206000005",
      idLine: "naufal_zafran",
      idDiscord: "naufal#1234",
    },
  ];

  const mentees = [];
  for (const menteeInfo of menteeData) {
    const mentee = await prisma.user.create({
      data: {
        ...menteeInfo,
        emailVerified: true,
        fillDetails: true,
        gender: Gender.Male,
        jalurMasuk: JalurMasuk.SNBT,
        jurusan: Jurusan.IlmuKomputer,
        asalSekolah: "SMA Negeri 2 Jakarta",
        role: Role.User,
      },
    });
    mentees.push(mentee);
  }

  console.log("👥 Created users");

  // Create a kelompok (group)
  const kelompok = await prisma.kelompok.create({
    data: {
      name: "Kelompok Alpro 1",
    },
  });

  // Add mentor to kelompok
  await prisma.kelompokUser.create({
    data: {
      userId: mentor.id,
      kelompokId: kelompok.id,
      isMentor: true,
    },
  });

  // Add mentees to kelompok
  for (const mentee of mentees) {
    await prisma.kelompokUser.create({
      data: {
        userId: mentee.id,
        kelompokId: kelompok.id,
        isMentor: false,
      },
    });
  }

  console.log("🏫 Created kelompok and assigned users");

  // Create Lab assignments (matching the structure from Lab.tsx)
  const labTasks = [
    {
      index: 1,
      title: "Lab 1",
      description: "Pengenalan Algoritma dan Pemrograman",
      linkTugas: "https://example.com/lab1",
      deadline: new Date("2025-08-30T23:59:00Z"),
      tipe: TipeTugas.LAB,
    },
    {
      index: 2,
      title: "Lab 2",
      description: "Variabel dan Tipe Data",
      linkTugas: "https://example.com/lab2",
      deadline: new Date("2025-09-06T23:59:00Z"),
      tipe: TipeTugas.LAB,
    },
    {
      index: 3,
      title: "Lab 3",
      description: "Percabangan dan Perulangan",
      linkTugas: "https://example.com/lab3",
      deadline: new Date("2025-09-13T23:59:00Z"),
      tipe: TipeTugas.LAB,
    },
    {
      index: 4,
      title: "Lab 4",
      description: "Fungsi dan Prosedur",
      linkTugas: "https://example.com/lab4",
      deadline: new Date("2025-09-20T23:59:00Z"),
      tipe: TipeTugas.LAB,
    },
    // TP assignments
    {
      index: 1,
      title: "TP 1",
      description: "Tugas Pemrograman 1 - Kalkulator Sederhana",
      linkTugas: "https://example.com/tp1",
      deadline: new Date("2025-09-15T23:59:00Z"),
      tipe: TipeTugas.TP,
    },
    {
      index: 2,
      title: "TP 2",
      description: "Tugas Pemrograman 2 - Sistem Manajemen Data",
      linkTugas: "https://example.com/tp2",
      deadline: new Date("2025-10-01T23:59:00Z"),
      tipe: TipeTugas.TP,
    },
    // Mini Quiz assignments
    {
      index: 1,
      title: "Mini Quiz 1",
      description: "Kuis Singkat - Dasar Algoritma",
      linkTugas: "https://example.com/quiz1",
      deadline: new Date("2025-08-25T23:59:00Z"),
      tipe: TipeTugas.MINIQUIZ,
    },
    {
      index: 2,
      title: "Mini Quiz 2",
      description: "Kuis Singkat - Struktur Data",
      linkTugas: "https://example.com/quiz2",
      deadline: new Date("2025-09-08T23:59:00Z"),
      tipe: TipeTugas.MINIQUIZ,
    },
  ];

  const createdTasks = [];
  for (const taskData of labTasks) {
    const { tipe, ...taskInfo } = taskData;
    const task = await prisma.tugas.create({
      data: {
        ...taskInfo,
        tipe: tipe,
      },
    });
    createdTasks.push(task);
  }

  console.log("📝 Created tasks (Labs, TPs, and Mini Quizzes)");

  // Create submissions for each mentee and task
  const submissionPatterns = [
    // Lab 1 - All submitted
    [
      {
        menteeIndex: 0,
        submitted: true,
        grade: null,
        url: "https://github.com/andrew/lab1",
      },
      {
        menteeIndex: 1,
        submitted: true,
        grade: null,
        url: "https://github.com/vazha/lab1",
      },
      {
        menteeIndex: 2,
        submitted: true,
        grade: null,
        url: "https://github.com/hakim/lab1",
      },
      {
        menteeIndex: 3,
        submitted: true,
        grade: null,
        url: "https://github.com/naufal/lab1",
      },
    ],
    // Lab 2 - One not submitted
    [
      {
        menteeIndex: 0,
        submitted: true,
        grade: null,
        url: "https://github.com/andrew/lab2",
      },
      {
        menteeIndex: 1,
        submitted: true,
        grade: null,
        url: "https://github.com/vazha/lab2",
      },
      {
        menteeIndex: 2,
        submitted: true,
        grade: null,
        url: "https://github.com/hakim/lab2",
      },
      { menteeIndex: 3, submitted: false, grade: null, url: "" },
    ],
    // Lab 3 - One not submitted (different student)
    [
      {
        menteeIndex: 0,
        submitted: true,
        grade: null,
        url: "https://github.com/andrew/lab3",
      },
      {
        menteeIndex: 1,
        submitted: true,
        grade: null,
        url: "https://github.com/vazha/lab3",
      },
      { menteeIndex: 2, submitted: false, grade: null, url: "" },
      {
        menteeIndex: 3,
        submitted: true,
        grade: null,
        url: "https://github.com/naufal/lab3",
      },
    ],
    // Lab 4 - All submitted
    [
      {
        menteeIndex: 0,
        submitted: true,
        grade: null,
        url: "https://github.com/andrew/lab4",
      },
      {
        menteeIndex: 1,
        submitted: true,
        grade: null,
        url: "https://github.com/vazha/lab4",
      },
      {
        menteeIndex: 2,
        submitted: true,
        grade: null,
        url: "https://github.com/hakim/lab4",
      },
      {
        menteeIndex: 3,
        submitted: true,
        grade: null,
        url: "https://github.com/naufal/lab4",
      },
    ],
    // TP 1 - Mixed submissions
    [
      {
        menteeIndex: 0,
        submitted: true,
        grade: null,
        url: "https://github.com/andrew/tp1",
      },
      {
        menteeIndex: 1,
        submitted: true,
        grade: null,
        url: "https://github.com/vazha/tp1",
      },
      { menteeIndex: 2, submitted: false, grade: null, url: "" },
      {
        menteeIndex: 3,
        submitted: true,
        grade: null,
        url: "https://github.com/naufal/tp1",
      },
    ],
    // TP 2 - All submitted
    [
      {
        menteeIndex: 0,
        submitted: true,
        grade: null,
        url: "https://github.com/andrew/tp2",
      },
      {
        menteeIndex: 1,
        submitted: true,
        grade: null,
        url: "https://github.com/vazha/tp2",
      },
      {
        menteeIndex: 2,
        submitted: true,
        grade: null,
        url: "https://github.com/hakim/tp2",
      },
      {
        menteeIndex: 3,
        submitted: true,
        grade: null,
        url: "https://github.com/naufal/tp2",
      },
    ],
    // Mini Quiz 1 - Most submitted
    [
      {
        menteeIndex: 0,
        submitted: true,
        grade: null,
        url: "https://forms.google.com/andrew-quiz1",
      },
      {
        menteeIndex: 1,
        submitted: true,
        grade: null,
        url: "https://forms.google.com/vazha-quiz1",
      },
      {
        menteeIndex: 2,
        submitted: true,
        grade: null,
        url: "https://forms.google.com/hakim-quiz1",
      },
      { menteeIndex: 3, submitted: false, grade: null, url: "" },
    ],
    // Mini Quiz 2 - All submitted
    [
      {
        menteeIndex: 0,
        submitted: true,
        grade: null,
        url: "https://forms.google.com/andrew-quiz2",
      },
      {
        menteeIndex: 1,
        submitted: true,
        grade: null,
        url: "https://forms.google.com/vazha-quiz2",
      },
      {
        menteeIndex: 2,
        submitted: true,
        grade: null,
        url: "https://forms.google.com/hakim-quiz2",
      },
      {
        menteeIndex: 3,
        submitted: true,
        grade: null,
        url: "https://forms.google.com/naufal-quiz2",
      },
    ],
  ];

  for (let taskIndex = 0; taskIndex < createdTasks.length; taskIndex++) {
    const task = createdTasks[taskIndex];
    const submissions = submissionPatterns[taskIndex];

    for (const submission of submissions) {
      if (submission.submitted) {
        await prisma.submisi.create({
          data: {
            userId: mentees[submission.menteeIndex].id,
            tugasId: task.id,
            link: submission.url,
            nilai: submission.grade,
            feedback: null,
            gradedBy: null,
          },
        });
      }
    }
  }

  console.log("📋 Created submissions");

  // Create some sample notifications
  await prisma.notification.createMany({
    data: [
      {
        title: "New Lab Assignment",
        content: "Lab 5 has been uploaded. Check the assignment details.",
        link: "/dashboard/assignments",
      },
      {
        title: "Grading Complete",
        content: "Grades for Lab 1 have been released.",
        link: "/dashboard/grades",
      },
      {
        title: "Reminder",
        content: "Lab 2 deadline is approaching. Submit before the due date.",
        link: "/dashboard/assignments",
      },
    ],
  });

  console.log("🔔 Created notifications");
  console.log("✅ Seed completed successfully!");

  console.log("\n📊 Summary:");
  console.log(`👨‍🏫 Created 1 mentor: ${mentor.name}`);
  console.log(
    `👨‍🎓 Created ${mentees.length} mentees: ${mentees
      .map((m) => m.name)
      .join(", ")}`
  );
  console.log(`🏫 Created 1 kelompok: ${kelompok.name}`);
  console.log(`📝 Created ${createdTasks.length} lab tasks`);
  console.log(
    `📋 Created multiple submissions with different completion patterns`
  );
  console.log(
    "\n🚀 You can now run the application and test the Lab grading feature!"
  );
}

main()
  .catch((e) => {
    console.error("❌ Seed failed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
