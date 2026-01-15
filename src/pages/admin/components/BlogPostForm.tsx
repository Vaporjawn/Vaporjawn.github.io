import React, { useState, useEffect } from 'react';
import {
  Box,
  Button,
  TextField,
  Card,
  CardContent,
  Typography,
  Chip,
  Autocomplete,
  FormControlLabel,
  Switch,
  Grid,
  Alert,
  CircularProgress,
  IconButton,
  InputAdornment,
} from '@mui/material';
import {
  Close as CloseIcon,
  Save as SaveIcon,
  Image as ImageIcon,
  AutoFixHigh as AutoIcon,
} from '@mui/icons-material';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import MDEditor from '@uiw/react-md-editor';
import { blogPostSchema, type BlogPostSchemaType } from '../../../schemas/blogPostSchema';
import {
  createBlogPost,
  updateBlogPost,
  isSlugUnique,
} from '../../../services/blogPostService';
import { uploadBlogFeaturedImage } from '../../../services/imageUploadService';
import { slugify } from '../../../utils/slugify';
import { calculateReadTime } from '../../../utils/readTimeEstimate';
import type { FirestoreBlogPost } from '../../../types/blog';
import { useAdminAuth } from '../../../contexts/AdminAuthContext';

interface BlogPostFormProps {
  post?: FirestoreBlogPost | null;
  onSuccess: () => void;
  onCancel: () => void;
}

export const BlogPostForm: React.FC<BlogPostFormProps> = ({
  post,
  onSuccess,
  onCancel,
}) => {
  const { isAuthenticated } = useAdminAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(
    post?.featuredImage || null
  );
  const [readTime, setReadTime] = useState(post?.readTime || 0);
  const [availableTags, setAvailableTags] = useState<string[]>([
    'React',
    'TypeScript',
    'JavaScript',
    'Web Development',
    'Firebase',
    'CSS',
    'HTML',
    'Node.js',
    'Performance',
    'Accessibility',
    'UI/UX',
    'Material-UI',
    'Tutorial',
    'Guide',
    'Best Practices',
  ]);

  const {
    control,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isDirty },
  } = useForm<BlogPostSchemaType>({
    resolver: yupResolver(blogPostSchema),
    defaultValues: {
      title: post?.title || '',
      slug: post?.slug || '',
      description: post?.description || '',
      content: post?.content || '',
      excerpt: post?.excerpt || '',
      tags: post?.tags || [],
      author: post?.author || 'Victor Williams', // Default admin author
      published: post?.published || false,
    },
  });

  const watchTitle = watch('title');
  const watchContent = watch('content');
  const watchSlug = watch('slug');

  // Auto-generate slug from title
  useEffect(() => {
    if (watchTitle && !post) {
      // Only auto-generate for new posts
      const newSlug = slugify(watchTitle);
      setValue('slug', newSlug, { shouldValidate: true });
    }
  }, [watchTitle, post, setValue]);

  // Calculate read time from content
  useEffect(() => {
    if (watchContent) {
      const estimatedReadTime = calculateReadTime(watchContent);
      setReadTime(estimatedReadTime);
    }
  }, [watchContent]);

  // Handle image selection
  const handleImageSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Validate file type
      const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];
      if (!validTypes.includes(file.type)) {
        setError('Please select a valid image file (JPEG, PNG, GIF, or WebP)');
        return;
      }

      // Validate file size (5MB)
      const maxSize = 5 * 1024 * 1024;
      if (file.size > maxSize) {
        setError('Image file size must be less than 5MB');
        return;
      }

      setSelectedImage(file);
      setError(null);

      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  // Remove selected image
  const handleImageRemove = () => {
    setSelectedImage(null);
    setImagePreview(post?.featuredImage || null);
  };

  // Form submission
  const onSubmit = async (data: BlogPostSchemaType) => {
    if (!isAuthenticated) {
      setError('You must be logged in to create or edit blog posts');
      return;
    }

    setLoading(true);
    setError(null);
    setUploadProgress(0);

    try {
      // Check slug uniqueness
      const slugIsUnique = await isSlugUnique(data.slug, post?.id);
      if (!slugIsUnique) {
        setError(`The slug "${data.slug}" is already in use. Please choose a different one.`);
        setLoading(false);
        return;
      }

      let featuredImageUrl = post?.featuredImage;

      // Upload featured image if selected
      if (selectedImage) {
        const tempPostId = post?.id || `temp-${Date.now()}`;
        featuredImageUrl = await uploadBlogFeaturedImage(
          selectedImage,
          tempPostId,
          (progress) => {
            setUploadProgress(progress);
          }
        );
      }

      // Use a default author ID for admin posts (can be customized)
      const authorId = 'admin'; // Or get from environment variable

      // Create or update blog post
      if (post) {
        // Update existing post
        await updateBlogPost(post.id, data, featuredImageUrl);
      } else {
        // Create new post
        await createBlogPost(data, authorId, featuredImageUrl);
      }

      // Success - close form and refresh list
      onSuccess();
    } catch (err) {
      console.error('Error saving blog post:', err);
      setError(
        err instanceof Error
          ? err.message
          : 'An error occurred while saving the blog post. Please try again.'
      );
    } finally {
      setLoading(false);
      setUploadProgress(0);
    }
  };

  return (
    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      {/* Header */}
      <Box
        sx={{
          p: 2,
          borderBottom: 1,
          borderColor: 'divider',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <Typography variant="h5">
          {post ? 'Edit Blog Post' : 'Create New Blog Post'}
        </Typography>
        <IconButton onClick={onCancel} disabled={loading}>
          <CloseIcon />
        </IconButton>
      </Box>

      {/* Form Content */}
      <Box sx={{ flexGrow: 1, overflow: 'auto', p: 3 }}>
        <form onSubmit={handleSubmit(onSubmit)}>
          {error && (
            <Alert severity="error" sx={{ mb: 3 }} onClose={() => setError(null)}>
              {error}
            </Alert>
          )}

          <Grid container spacing={3}>
            {/* Left Column - Main Content */}
            <Grid item xs={12} md={8}>
              {/* Title */}
              <Controller
                name="title"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Title"
                    fullWidth
                    required
                    error={!!errors.title}
                    helperText={errors.title?.message}
                    sx={{ mb: 3 }}
                    disabled={loading}
                  />
                )}
              />

              {/* Slug */}
              <Controller
                name="slug"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="URL Slug"
                    fullWidth
                    required
                    error={!!errors.slug}
                    helperText={
                      errors.slug?.message ||
                      'Lowercase letters, numbers, and hyphens only'
                    }
                    sx={{ mb: 3 }}
                    disabled={loading}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            onClick={() =>
                              setValue('slug', slugify(watchTitle), {
                                shouldValidate: true,
                              })
                            }
                            disabled={!watchTitle || loading}
                            size="small"
                            title="Auto-generate from title"
                          >
                            <AutoIcon />
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
                )}
              />

              {/* Content Editor */}
              <Box sx={{ mb: 3 }}>
                <Typography variant="subtitle2" gutterBottom>
                  Content <span style={{ color: 'red' }}>*</span>
                </Typography>
                <Controller
                  name="content"
                  control={control}
                  render={({ field }) => (
                    <Box data-color-mode="light">
                      <MDEditor
                        value={field.value}
                        onChange={(value) => field.onChange(value || '')}
                        height={400}
                        preview="edit"
                        hideToolbar={false}
                        enableScroll={true}
                        textareaProps={{
                          disabled: loading,
                        }}
                      />
                      {errors.content && (
                        <Typography
                          variant="caption"
                          color="error"
                          sx={{ mt: 0.5, display: 'block' }}
                        >
                          {errors.content.message}
                        </Typography>
                      )}
                    </Box>
                  )}
                />
              </Box>

              {/* Excerpt */}
              <Controller
                name="excerpt"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Excerpt (Optional)"
                    fullWidth
                    multiline
                    rows={3}
                    error={!!errors.excerpt}
                    helperText={
                      errors.excerpt?.message ||
                      'Brief summary for previews. Auto-generated if empty.'
                    }
                    sx={{ mb: 3 }}
                    disabled={loading}
                  />
                )}
              />
            </Grid>

            {/* Right Column - Metadata */}
            <Grid item xs={12} md={4}>
              <Card sx={{ mb: 3 }}>
                <CardContent>
                  {/* Publish Toggle */}
                  <Controller
                    name="published"
                    control={control}
                    render={({ field }) => (
                      <FormControlLabel
                        control={
                          <Switch
                            checked={field.value}
                            onChange={field.onChange}
                            disabled={loading}
                          />
                        }
                        label={field.value ? 'Published' : 'Draft'}
                        sx={{ mb: 2 }}
                      />
                    )}
                  />

                  {/* Read Time Display */}
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                    Estimated read time: {readTime} min
                  </Typography>

                  {/* Author */}
                  <Controller
                    name="author"
                    control={control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        label="Author"
                        fullWidth
                        required
                        error={!!errors.author}
                        helperText={errors.author?.message}
                        sx={{ mb: 2 }}
                        disabled={loading}
                      />
                    )}
                  />

                  {/* Tags */}
                  <Controller
                    name="tags"
                    control={control}
                    render={({ field }) => (
                      <Autocomplete
                        multiple
                        freeSolo
                        options={availableTags}
                        value={field.value}
                        onChange={(_, newValue) => field.onChange(newValue)}
                        disabled={loading}
                        renderTags={(value, getTagProps) =>
                          value.map((option, index) => (
                            <Chip
                              label={option}
                              {...getTagProps({ index })}
                              size="small"
                            />
                          ))
                        }
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            label="Tags"
                            error={!!errors.tags}
                            helperText={
                              errors.tags?.message || 'Type and press Enter to add tags'
                            }
                          />
                        )}
                        sx={{ mb: 2 }}
                      />
                    )}
                  />

                  {/* Description (SEO) */}
                  <Controller
                    name="description"
                    control={control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        label="Meta Description"
                        fullWidth
                        required
                        multiline
                        rows={3}
                        error={!!errors.description}
                        helperText={
                          errors.description?.message ||
                          'For SEO and social media previews'
                        }
                        disabled={loading}
                      />
                    )}
                  />
                </CardContent>
              </Card>

              {/* Featured Image Card */}
              <Card>
                <CardContent>
                  <Typography variant="subtitle2" gutterBottom>
                    Featured Image
                  </Typography>

                  {imagePreview && (
                    <Box sx={{ position: 'relative', mb: 2 }}>
                      <img
                        src={imagePreview}
                        alt="Featured preview"
                        style={{
                          width: '100%',
                          height: 200,
                          objectFit: 'cover',
                          borderRadius: 8,
                        }}
                      />
                      <IconButton
                        onClick={handleImageRemove}
                        disabled={loading}
                        sx={{
                          position: 'absolute',
                          top: 8,
                          right: 8,
                          bgcolor: 'background.paper',
                          '&:hover': { bgcolor: 'background.paper' },
                        }}
                        size="small"
                      >
                        <CloseIcon fontSize="small" />
                      </IconButton>
                    </Box>
                  )}

                  <input
                    accept="image/jpeg,image/jpg,image/png,image/gif,image/webp"
                    style={{ display: 'none' }}
                    id="featured-image-upload"
                    type="file"
                    onChange={handleImageSelect}
                    disabled={loading}
                  />
                  <label htmlFor="featured-image-upload">
                    <Button
                      variant="outlined"
                      component="span"
                      fullWidth
                      startIcon={<ImageIcon />}
                      disabled={loading}
                    >
                      {imagePreview ? 'Change Image' : 'Upload Image'}
                    </Button>
                  </label>

                  {uploadProgress > 0 && uploadProgress < 100 && (
                    <Box sx={{ mt: 2 }}>
                      <Typography variant="caption" color="text.secondary">
                        Uploading: {uploadProgress}%
                      </Typography>
                      <Box
                        sx={{
                          width: '100%',
                          height: 4,
                          bgcolor: 'grey.300',
                          borderRadius: 2,
                          mt: 0.5,
                        }}
                      >
                        <Box
                          sx={{
                            width: `${uploadProgress}%`,
                            height: '100%',
                            bgcolor: 'primary.main',
                            borderRadius: 2,
                            transition: 'width 0.3s',
                          }}
                        />
                      </Box>
                    </Box>
                  )}

                  <Typography variant="caption" color="text.secondary" sx={{ mt: 1, display: 'block' }}>
                    JPEG, PNG, GIF, WebP (max 5MB)
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </form>
      </Box>

      {/* Footer Actions */}
      <Box
        sx={{
          p: 2,
          borderTop: 1,
          borderColor: 'divider',
          display: 'flex',
          justifyContent: 'flex-end',
          gap: 2,
        }}
      >
        <Button onClick={onCancel} disabled={loading}>
          Cancel
        </Button>
        <Button
          variant="contained"
          onClick={handleSubmit(onSubmit)}
          disabled={loading || !isDirty}
          startIcon={loading ? <CircularProgress size={20} /> : <SaveIcon />}
        >
          {loading ? 'Saving...' : post ? 'Update Post' : 'Create Post'}
        </Button>
      </Box>
    </Box>
  );
};
