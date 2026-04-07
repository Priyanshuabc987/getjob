
import React from 'react';

type FormSectionProps = {
  title: string;
  description: string;
  children: React.ReactNode;
};

export function FormSection({ title, description, children }: FormSectionProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 border-b border-gray-200 pb-8">
      <div className="md:col-span-1">
        <h3 className="text-lg font-semibold leading-6 text-gray-900">{title}</h3>
        <p className="mt-1 text-sm text-gray-600">{description}</p>
      </div>
      <div className="md:col-span-2 space-y-4">{children}</div>
    </div>
  );
}
