import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

interface UserAvatar {
  name: string;
  image: string;
  className?: string;
}

function UserAvatar({ name, image, className }: UserAvatar) {
  return (
    <Avatar className={cn("bg-white text-black", className)}>
      <AvatarImage src={image} />
      {name && (
        <AvatarFallback className="dark:bg-white text-black text-lg">
          {name
            .split(" ")
            .map((n) => n?.[0])
            .join("")}
        </AvatarFallback>
      )}
    </Avatar>
  );
}

export default UserAvatar;
