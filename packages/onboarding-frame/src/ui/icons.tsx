import type { ComponentType } from "react";
import type { LucideProps } from "lucide-react";
import {
  Activity, Archive, ArrowDown, ArrowLeft as LuArrowLeft, ArrowLeftRight,
  ArrowRight as LuArrowRight, ArrowUp, ArrowUpDown, Bell, Book, Bookmark, Bot,
  Box, Briefcase, Building2, Calendar, ChartColumn, ChartLine, ChartPie,
  Check as LuCheck, ChevronDown as LuChevronDown, ChevronLeft as LuChevronLeft,
  ChevronRight as LuChevronRight, ChevronUp as LuChevronUp, Circle, CircleCheck,
  CircleX, Clipboard, Clock, Cloud, Code, Coins, Columns3, Command, Copy, Cpu,
  CreditCard, Database, DollarSign, Download, Ellipsis, EllipsisVertical,
  Eye, ExternalLink, File, Files, Filter, Flag, Folder, Gauge, Gem, Gift as LuGift,
  GitBranch, Globe, Hand, Heart, History, House, Image, Info as LuInfo,
  KanbanSquare, Key, Landmark, Layers, LayoutDashboard, LayoutGrid, Leaf,
  LifeBuoy, Lightbulb, Link, List, LoaderCircle, Lock as LuLock, LockOpen,
  Magnet, Mail, Map, MapPin, Maximize2, Megaphone, Menu, MessageSquare, Mic,
  Monitor, Moon as LuMoon, Music, Palette, PanelLeft, Pause, Pencil, Phone,
  Play, Plus as LuPlus, Puzzle, Receipt, RefreshCw, Rocket, Search, Send,
  Server, Settings, Share2, Shield, ShieldCheck, ShoppingCart,
  Shuffle as LuShuffle, SlidersHorizontal, Sparkles, Star as LuStar, Store,
  Sun as LuSun, Table, Tag, Target, Terminal, TrendingDown, TrendingUp,
  TriangleAlert, Trash2, Trophy, Truck, Upload, User, UserPlus, Users, Video,
  Wallet, Wand2, X, Zap, VenetianMask,
} from "lucide-react";

/**
 * Icons.
 *
 * These are Lucide, not a hand-drawn set: it is maintained, MIT licensed, and
 * it is what the reference products' icons actually look like. Drawing our own
 * meant carrying bespoke paths for a worse match.
 *
 * Templates previously used Unicode glyphs and emoji here — a box-drawing
 * character for a nav item, an avocado for a spending category. Those resolve
 * to whatever font the OS supplies, so weight, size and baseline vary per
 * machine. Never again; see CLAUDE.md.
 *
 * Product chrome is drawn at 14-18px, where Lucide's default 24px at a 2px
 * stroke reads as heavy, so these default to 16px at 1.5. Any call site can
 * override both, and width/height still win over size because they spread last.
 */
type IconProps = LucideProps;

const ic =
  (C: ComponentType<LucideProps>, size = 16) =>
  (p: IconProps) => <C size={size} strokeWidth={1.5} aria-hidden {...p} />;

/* chevrons and arrows keep their historical names and sizes */
export const ChevronLeft = ic(LuChevronLeft, 20);
export const ChevronRight = ic(LuChevronRight, 20);
export const ChevronDown = ic(LuChevronDown, 20);
export const ChevronUp = ic(LuChevronUp, 20);
export const ArrowRight = ic(LuArrowRight, 18);
export const ArrowLeft = ic(LuArrowLeft, 18);
export const ArrowUpIcon = ic(ArrowUp);
export const ArrowDownIcon = ic(ArrowDown);

/* carried over from the previous module so call sites keep working */
export const Check = ic(LuCheck);
export const Cross = ic(X);
export const Sparkle = ic(Sparkles);
export const Lock = ic(LuLock);
export const Sun = ic(LuSun);
export const Moon = ic(LuMoon);
export const Spinner = ic(LoaderCircle, 24);
export const Star = ic(LuStar, 14);
export const Plus = ic(LuPlus, 18);
export const Info = ic(LuInfo);
export const Shuffle = ic(LuShuffle);
export const Gift = ic(LuGift, 20);

/* navigation and layout */
export const HomeIcon = ic(House);
export const GridIcon = ic(LayoutGrid);
export const ListIcon = ic(List);
export const LayoutIcon = ic(LayoutDashboard);
export const SidebarIcon = ic(PanelLeft);
export const LayersIcon = ic(Layers);
export const PanelIcon = ic(PanelLeft);
export const ColumnsIcon = ic(Columns3);
export const TableIcon = ic(Table);
export const KanbanIcon = ic(KanbanSquare);
export const MenuIcon = ic(Menu);

/* files and media */
export const FileIcon = ic(File);
export const FilesIcon = ic(Files);
export const FolderIcon = ic(Folder);
export const ArchiveIcon = ic(Archive);
export const ImageIcon = ic(Image);
export const VideoIcon = ic(Video);
export const MicIcon = ic(Mic);
export const PaletteIcon = ic(Palette);
export const MusicIcon = ic(Music);

/* people and places */
export const UserIcon = ic(User);
export const UsersIcon = ic(Users);
export const UserPlusIcon = ic(UserPlus);
export const BuildingIcon = ic(Building2);
export const BankIcon = ic(Landmark);
export const StoreIcon = ic(Store);

/* communication */
export const ChatIcon = ic(MessageSquare);
export const MailIcon = ic(Mail);
export const BellIcon = ic(Bell);
export const MegaphoneIcon = ic(Megaphone);
export const SendIcon = ic(Send);
export const PhoneIcon = ic(Phone);

/* time */
export const CalendarIcon = ic(Calendar);
export const ClockIcon = ic(Clock);
export const TimerIcon = ic(Clock);
export const HistoryIcon = ic(History);

/* charts */
export const BarChartIcon = ic(ChartColumn);
export const LineChartIcon = ic(ChartLine);
export const PieChartIcon = ic(ChartPie);
export const TrendUpIcon = ic(TrendingUp);
export const TrendDownIcon = ic(TrendingDown);
export const ActivityIcon = ic(Activity);
export const TargetIcon = ic(Target);
export const GaugeIcon = ic(Gauge);

/* money */
export const CreditCardIcon = ic(CreditCard);
export const WalletIcon = ic(Wallet);
export const ReceiptIcon = ic(Receipt);
export const DollarIcon = ic(DollarSign);
export const CoinsIcon = ic(Coins);

/* actions */
export const SearchIcon = ic(Search);
export const FilterIcon = ic(Filter);
export const SortIcon = ic(ArrowUpDown);
export const RefreshIcon = ic(RefreshCw);
export const DownloadIcon = ic(Download);
export const UploadIcon = ic(Upload);
export const ShareIcon = ic(Share2);
export const CopyIcon = ic(Copy);
export const EditIcon = ic(Pencil);
export const TrashIcon = ic(Trash2);
export const MoreIcon = ic(Ellipsis);
export const MoreVerticalIcon = ic(EllipsisVertical);
export const SettingsIcon = ic(Settings);
export const SlidersIcon = ic(SlidersHorizontal);
export const ExternalIcon = ic(ExternalLink);
export const LinkIcon = ic(Link);
export const ExpandIcon = ic(Maximize2);
export const CommandIcon = ic(Command);
export const SwapIcon = ic(ArrowLeftRight);

/* status */
export const AlertIcon = ic(TriangleAlert);
export const ShieldIcon = ic(Shield);
export const ShieldCheckIcon = ic(ShieldCheck);
export const KeyIcon = ic(Key);
export const UnlockIcon = ic(LockOpen);
export const ZapIcon = ic(Zap);
export const FlagIcon = ic(Flag);
export const HeartIcon = ic(Heart);
export const CheckCircleIcon = ic(CircleCheck);
export const XCircleIcon = ic(CircleX);
export const CircleIcon = ic(Circle);
export const DotIcon = (p: IconProps) => (
  <Circle size={16} fill="currentColor" strokeWidth={0} aria-hidden {...p} />
);
export const RecordIcon = DotIcon;
export const PauseIcon = ic(Pause);
export const PlayIcon = ic(Play);
export const LifebuoyIcon = ic(LifeBuoy);

/* platform */
export const CodeIcon = ic(Code);
export const TerminalIcon = ic(Terminal);
export const BranchIcon = ic(GitBranch);
export const DatabaseIcon = ic(Database);
export const ServerIcon = ic(Server);
export const CloudIcon = ic(Cloud);
export const GlobeIcon = ic(Globe);
export const CpuIcon = ic(Cpu);
export const RocketIcon = ic(Rocket);
export const BoxIcon = ic(Box);
export const PuzzleIcon = ic(Puzzle);
export const RobotIcon = ic(Bot);
export const MonitorIcon = ic(Monitor);

/* misc */
export const BookmarkIcon = ic(Bookmark);
export const TagIcon = ic(Tag);
export const MapIcon = ic(Map);
export const PinIcon = ic(MapPin);
export const LightbulbIcon = ic(Lightbulb);
export const BookIcon = ic(Book);
export const TrophyIcon = ic(Trophy);
export const CartIcon = ic(ShoppingCart);
export const TruckIcon = ic(Truck);
export const LeafIcon = ic(Leaf);
export const WandIcon = ic(Wand2);
export const HandIcon = ic(Hand);
export const BriefcaseIcon = ic(Briefcase);
export const MagnetIcon = ic(Magnet);
export const ClipboardIcon = ic(Clipboard);
export const GemIcon = ic(Gem);
export const EyeIcon = ic(Eye);
export const IncognitoIcon = ic(VenetianMask);

/**
 * Icons addressed by name.
 *
 * Templates are data-driven — a nav or list is an array of plain objects — so
 * the rows carry an icon name and this maps it to the component. A missing
 * name renders nothing rather than a broken glyph.
 */
export const icons = {
  home: HomeIcon, grid: GridIcon, list: ListIcon, layout: LayoutIcon,
  sidebar: SidebarIcon, layers: LayersIcon, panel: PanelIcon, columns: ColumnsIcon,
  table: TableIcon, kanban: KanbanIcon,
  file: FileIcon, files: FilesIcon, folder: FolderIcon, archive: ArchiveIcon,
  image: ImageIcon, video: VideoIcon, mic: MicIcon, palette: PaletteIcon,
  user: UserIcon, users: UsersIcon, userPlus: UserPlusIcon,
  building: BuildingIcon, bank: BankIcon, store: StoreIcon,
  chat: ChatIcon, mail: MailIcon, bell: BellIcon, megaphone: MegaphoneIcon,
  send: SendIcon, phone: PhoneIcon,
  calendar: CalendarIcon, clock: ClockIcon, timer: TimerIcon, history: HistoryIcon,
  barChart: BarChartIcon, lineChart: LineChartIcon, pieChart: PieChartIcon,
  trendUp: TrendUpIcon, trendDown: TrendDownIcon, activity: ActivityIcon,
  target: TargetIcon, gauge: GaugeIcon,
  creditCard: CreditCardIcon, wallet: WalletIcon, receipt: ReceiptIcon,
  dollar: DollarIcon, coins: CoinsIcon,
  search: SearchIcon, filter: FilterIcon, sort: SortIcon, refresh: RefreshIcon,
  download: DownloadIcon, upload: UploadIcon, share: ShareIcon, copy: CopyIcon,
  edit: EditIcon, trash: TrashIcon, more: MoreIcon, moreVertical: MoreVerticalIcon,
  settings: SettingsIcon, sliders: SlidersIcon, external: ExternalIcon,
  link: LinkIcon, expand: ExpandIcon, command: CommandIcon,
  alert: AlertIcon, shield: ShieldIcon, shieldCheck: ShieldCheckIcon, key: KeyIcon,
  unlock: UnlockIcon, lock: Lock, zap: ZapIcon, flag: FlagIcon, heart: HeartIcon,
  checkCircle: CheckCircleIcon, xCircle: XCircleIcon, circle: CircleIcon,
  dot: DotIcon, pause: PauseIcon, play: PlayIcon, star: Star,
  code: CodeIcon, terminal: TerminalIcon, branch: BranchIcon, database: DatabaseIcon,
  server: ServerIcon, cloud: CloudIcon, globe: GlobeIcon, cpu: CpuIcon,
  rocket: RocketIcon, box: BoxIcon, puzzle: PuzzleIcon, robot: RobotIcon,
  bookmark: BookmarkIcon, tag: TagIcon, map: MapIcon, pin: PinIcon,
  lightbulb: LightbulbIcon, book: BookIcon, trophy: TrophyIcon, cart: CartIcon,
  truck: TruckIcon, leaf: LeafIcon, wand: WandIcon, hand: HandIcon,
  chevronUp: ChevronUp, arrowUp: ArrowUpIcon, arrowDown: ArrowDownIcon,
  menu: MenuIcon, monitor: MonitorIcon, briefcase: BriefcaseIcon,
  music: MusicIcon, swap: SwapIcon, lifebuoy: LifebuoyIcon, magnet: MagnetIcon,
  clipboard: ClipboardIcon, gem: GemIcon, record: RecordIcon, sun: Sun, moon: Moon,
  shuffle: Shuffle,
  sparkle: Sparkle, check: Check, cross: Cross, plus: Plus, info: Info,
  gift: Gift, chevronDown: ChevronDown, chevronRight: ChevronRight,
  chevronLeft: ChevronLeft, arrowRight: ArrowRight, arrowLeft: ArrowLeft,
} as const;

export type IconName = keyof typeof icons;

export function Icon({ name, ...rest }: { name: IconName } & IconProps) {
  const Cmp = icons[name];
  return Cmp ? <Cmp {...rest} /> : null;
}
