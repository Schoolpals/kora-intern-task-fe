import React from 'react';

export default function ProgressBar({ progress, total }: { progress: number, total: number }) {
  return (
    <div className="bg-white dark:bg-secondary-dark h-4 mt-6 p-1 rounded-full">
      <div
        className={`bg-primary-button h-full rounded-full`}
        style={{ width:(progress / total) * 100  + '%' }}
      ></div>
    </div>
  );
}