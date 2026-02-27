import { Card, CardBody, CardFooter, Skeleton } from "@heroui/react";

export default function PostCardSkeleton() {
  return (
    <Card className="shadow-md rounded-2xl overflow-hidden bg-white border border-gray-100">
      {/* Post Header */}
      <CardBody className="pb-0 pt-4 px-4">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            {/* Avatar */}
            <Skeleton className="w-12 h-12 rounded-full" />
            <div className="space-y-2">
              {/* Username */}
              <Skeleton className="h-4 w-32 rounded-lg" />
              {/* Date */}
              <Skeleton className="h-3 w-20 rounded-lg" />
            </div>
          </div>
          {/* Menu button */}
          <Skeleton className="h-5 w-5 rounded-md" />
        </div>

        {/* Post text lines */}
        <div className="space-y-2 mb-4">
          <Skeleton className="h-3 w-full rounded-lg" />
          <Skeleton className="h-3 w-full rounded-lg" />
          <Skeleton className="h-3 w-3/4 rounded-lg" />
        </div>

        {/* Post Image */}
        <Skeleton className="rounded-xl w-full h-80 mb-4" />
      </CardBody>

      {/* Post Stats */}
      <CardBody className="py-3 px-4 border-t border-gray-100">
        <div className="flex items-center justify-between">
          {/* Reaction icons + likes count */}
          <div className="flex items-center gap-1">
            <Skeleton className="w-5 h-5 rounded-full" />
            <Skeleton className="w-5 h-5 rounded-full" />
            <Skeleton className="w-5 h-5 rounded-full" />
            <Skeleton className="h-3 w-8 rounded-lg ml-1" />
          </div>
          {/* Comments + Views */}
          <div className="flex gap-4">
            <Skeleton className="h-3 w-20 rounded-lg" />
            <Skeleton className="h-3 w-16 rounded-lg" />
          </div>
        </div>
      </CardBody>

      {/* Post Actions */}
      <CardFooter className="flex justify-between px-4 py-3 border-t border-gray-100 bg-gray-50">
        <Skeleton className="h-9 w-24 rounded-lg" />
        <Skeleton className="h-9 w-24 rounded-lg" />
        <Skeleton className="h-9 w-24 rounded-lg" />
      </CardFooter>
    </Card>
  );
}
