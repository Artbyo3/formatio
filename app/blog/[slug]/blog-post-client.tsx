"use client";

import { useState } from "react";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  ArrowLeft, 
  Calendar, 
  User, 
  BookOpen, 
  Facebook,
  Twitter,
  Linkedin,
  Copy,
  Check,
  Star
} from "lucide-react";

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  author: string;
  date: string;
  readTime: string;
  tags: string[];
  featured: boolean;
}

interface BlogPostClientProps {
  post: BlogPost;
}

export function BlogPostClient({ post }: BlogPostClientProps) {
  const [copied, setCopied] = useState(false);

  const handleShare = async (platform: string) => {
    const url = window.location.href;
    const title = post.title;
    
    switch (platform) {
      case 'facebook':
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`, '_blank');
        break;
      case 'twitter':
        window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`, '_blank');
        break;
      case 'linkedin':
        window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`, '_blank');
        break;
      case 'copy':
        await navigator.clipboard.writeText(url);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
        break;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center gap-4 mb-6">
            <Link href="/blog">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Volver al blog
              </Button>
            </Link>
          </div>
          
          <div className="flex items-center gap-2 mb-4">
            <Badge variant="secondary">{post.category}</Badge>
            {post.featured && (
              <Badge variant="outline" className="text-xs">
                <Star className="h-3 w-3 mr-1" />
                Destacado
              </Badge>
            )}
          </div>
          
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            {post.title}
          </h1>
          
          <p className="text-xl text-gray-600 mb-6">
            {post.excerpt}
          </p>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-6 text-sm text-gray-500">
              <span className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                {new Date(post.date).toLocaleDateString('es-ES')}
              </span>
              <span className="flex items-center gap-2">
                <BookOpen className="h-4 w-4" />
                {post.readTime}
              </span>
              <span className="flex items-center gap-2">
                <User className="h-4 w-4" />
                {post.author}
              </span>
            </div>
            
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleShare('facebook')}
              >
                <Facebook className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleShare('twitter')}
              >
                <Twitter className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleShare('linkedin')}
              >
                <Linkedin className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleShare('copy')}
              >
                {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Card>
          <CardContent className="p-8">
            <div 
              className="prose prose-lg max-w-none prose-headings:text-gray-900 prose-headings:font-bold prose-p:text-gray-700 prose-p:leading-relaxed prose-ul:text-gray-700 prose-ol:text-gray-700 prose-li:text-gray-700 prose-strong:text-gray-900 prose-strong:font-semibold prose-code:text-gray-900 prose-code:bg-gray-100 prose-code:px-1 prose-code:py-0.5 prose-code:rounded prose-pre:bg-gray-100 prose-pre:border prose-pre:border-gray-200 prose-blockquote:border-l-4 prose-blockquote:border-blue-500 prose-blockquote:pl-4 prose-blockquote:italic prose-blockquote:text-gray-600"
              dangerouslySetInnerHTML={{ 
                __html: post.content
                  .replace(/^# (.*$)/gim, '<h1 class="text-3xl font-bold text-gray-900 mb-6">$1</h1>')
                  .replace(/^## (.*$)/gim, '<h2 class="text-2xl font-bold text-gray-900 mb-4 mt-8">$1</h2>')
                  .replace(/^### (.*$)/gim, '<h3 class="text-xl font-semibold text-gray-900 mb-3 mt-6">$1</h3>')
                  .replace(/^\- (.*$)/gim, '<li class="mb-1">$1</li>')
                  .replace(/^\* (.*$)/gim, '<li class="mb-1">$1</li>')
                  .replace(/^\*\*(.*?)\*\*/gim, '<strong class="font-semibold text-gray-900">$1</strong>')
                  .replace(/^\*(.*?)\*/gim, '<em class="italic">$1</em>')
                  .replace(/\n\n/gim, '</p><p class="mb-4 text-gray-700 leading-relaxed">')
                  .replace(/^(?!<[h|l])(.*$)/gim, '<p class="mb-4 text-gray-700 leading-relaxed">$1</p>')
                  .replace(/<p class="mb-4 text-gray-700 leading-relaxed"><\/p>/gim, '')
                  .replace(/<li class="mb-1">(.*?)<\/li>/gim, '<ul class="list-disc list-inside mb-4 space-y-1"><li class="mb-1">$1</li></ul>')
                  .replace(/<\/ul>\s*<ul class="list-disc list-inside mb-4 space-y-1">/gim, '')
              }}
            />
          </CardContent>
        </Card>

        {/* Tags */}
        <div className="mt-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Etiquetas</h3>
          <div className="flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <Badge key={tag} variant="outline" className="text-sm">
                {tag}
              </Badge>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
