import { useEffect, useState } from 'react';
import type { Framework, Template } from '~/types/template';
import { useTemplateStore } from '~/store';
import { useParams } from '@remix-run/react';

export default function Index() {
  const { id } = useParams();
  const { fetchTemplateById } = useTemplateStore();

  const [template, setTemplate] = useState<Template | null>(null);
  const framework: Framework[] = [
    {
      id: 'react',
      name: 'React',
      description:
        'Thư viện JavaScript phổ biến nhất để xây dựng giao diện người dùng. Cộng đồng lớn mạnh với nhiều thư viện hỗ trợ. Hiệu suất cao và linh hoạt trong việc phát triển ứng dụng web động.',
      logo: 'https://raw.githubusercontent.com/github/explore/80688e429a7d4ef2fca1e82350fe8e3517d3494d/topics/react/react.png',
      selected: true,
    },
    {
      id: 'springBoot',
      name: 'Spring Boot',
      description:
        'Spring là một framework Java mạnh mẽ để phát triển ứng dụng web và RESTful API. Hỗ trợ cấu hình tự động, giảm code lặp và tích hợp tốt với Hibernate, Thymeleaf. Thích hợp cho cả dự án nhỏ lẫn hệ thống lớn nhờ kiến trúc linh hoạt.',
      logo: 'https://avatars.githubusercontent.com/u/317776?s=200&v=4',
      selected: true,
    },
  ];

  useEffect(() => {
    if (!id) {
      return;
    }

    const fetch = async () => {
      const data = await fetchTemplateById(id);
      setTemplate(data);
    };

    fetch();
  }, [id]);

  return <div className="flex flex-col w-full bg-bolt-elements-background-depth-1">hello</div>;
}
