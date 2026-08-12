import {
  Laptop,
  Monitor as MonitorIcon,
  Gamepad2,
  Cpu,
  CircuitBoard,
  MemoryStick,
  Keyboard,
  HardDrive,
  Headphones,
  Tv,
} from 'lucide-react'

export const categories = [
  { id: 'laptops', name: 'Laptops', icon: Laptop, count: 2 },
  { id: 'pcs', name: 'PCs', icon: MonitorIcon, count: 1 },
  { id: 'gaming', name: 'Gaming', icon: Gamepad2, count: 2 },
  { id: 'procesadores', name: 'Procesadores', icon: Cpu, count: 1 },
  { id: 'graficas', name: 'Tarjetas Gráficas', icon: CircuitBoard, count: 1 },
  { id: 'monitores', name: 'Monitores', icon: Tv, count: 1 },
  { id: 'componentes', name: 'Componentes', icon: MemoryStick, count: 1 },
  { id: 'perifericos', name: 'Periféricos', icon: Keyboard, count: 1 },
  { id: 'almacenamiento', name: 'Almacenamiento', icon: HardDrive, count: 1 },
  { id: 'accesorios', name: 'Accesorios', icon: Headphones, count: 1 },
]
