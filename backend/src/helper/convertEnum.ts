import { CATEGORY, STATUS } from "@prisma/client";

const categoryMap: Record<string, CATEGORY> = {
  financial: CATEGORY.FINANCIAL,
  technology: CATEGORY.TECHNOLOGY,
  health: CATEGORY.HEALTH,
};

const statusMap: Record<string, STATUS> = {
  draft: STATUS.DRAFT,
  publish: STATUS.PUBLISH,
};

export function changeCategoryString(category: string): CATEGORY | undefined {
  return categoryMap[category.toLowerCase()];
}

export function changeStatusString(status: string): STATUS | undefined {
  return statusMap[status.toLowerCase()];
}
