export interface NotificationItem {
  id: string;
  header: string;
  description: string;
  color?: 'purple' | 'yellow' | 'green';
}

export const notifications: NotificationItem[] = [
  {
    id: "1",
    header: "Lab 3 rilis",
    description:
      "Lab 3 sudah dapat diakses di LMS.",
    color: 'purple',
  },
  {
    id: "2",
    header: "Revisi Lab 2",
    description:
      "Revisi Lab 2 sudah dapat diakses di LMS.",
    color: 'yellow',
  },
  {
    id: "3",
    header: "Lab 2 rilis",
    description:
      "Lab 2 sudah dapat diakses di LMS.",
    color: 'purple',
  },
  {
    id: "4",
    header: "Lab 1 rilis",
    description:
      "Lab 1 sudah dapat diakses di LMS.",
    color: 'green',
  },
]; 