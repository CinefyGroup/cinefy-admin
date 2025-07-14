# Cinefy Admin Panel

A comprehensive administrative dashboard for managing Cinefy, a casting call publishing platform. Built with Next.js 14, TypeScript, and modern web technologies.

https://www.admin.cinefy.in

## Overview

The Cinefy Admin Panel provides role-based access control (RBAC) for managing casting calls, user administration, content management, and analytics. The system supports multiple admin roles with granular permissions across different modules.

## Technical Architecture

### Frontend Stack
- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS with custom design system
- **UI Components**: Shadcn/ui with Radix UI primitives
- **State Management**: React Query for server state
- **Forms**: React Hook Form with Zod validation
- **Authentication**: Context-based auth with JWT tokens

### Key Dependencies
- `@tanstack/react-query`: Server state management
- `@radix-ui/*`: Accessible UI primitives
- `react-hook-form`: Form handling
- `zod`: Schema validation
- `axios`: HTTP client
- `lucide-react`: Icon library
- `recharts`: Data visualization

### Project Structure
```
cinefy-admin/
├── app/                    # Next.js app directory
│   ├── admins/            # Admin management
│   ├── casting-calls/     # Casting call CRUD
│   ├── dashboard/         # Analytics dashboard
│   └── settings/          # System configuration
├── components/            # Reusable components
│   ├── admin/            # Admin-specific components
│   ├── dashboard/        # Dashboard components
│   └── ui/              # Base UI components
├── context/              # React contexts
├── hooks/                # Custom React hooks
├── lib/                  # Utility functions
└── data/                 # Static data (permissions)
```

## API Integration

### Authentication
- JWT-based authentication
- Cookie-based token storage
- Middleware-based route protection
- Role-based route access control

### Data Management
- RESTful API integration via Axios
- React Query for caching and synchronization
- Form data handling with multipart support
- Real-time validation and error handling

## Permission System

The system implements a granular permission model:

### Resource-Based Permissions
- **Casting Calls**: CRUD operations with role restrictions
- **Projects**: Property management with access control
- **Content**: Blog, banner, and section management
- **Users**: Admin management and enquiry handling
- **Settings**: System configuration access

### Permission Methods
- `GET`: Read access to resources
- `POST`: Create new resources
- `PUT/PATCH`: Update existing resources
- `DELETE`: Remove resources

### Role Hierarchy
1. **Super Admin**: Unrestricted access
2. **Administrator**: Admin management + content access
3. **Content Manager**: Content creation and editing
4. **Customer Support**: User support and enquiry management
5. **Viewer**: Read-only access to assigned resources

## Development Setup

### Prerequisites
- Node.js 18+ 
- npm or yarn package manager

### Installation
```bash
# Clone repository
git clone <repository-url>
cd cinefy-admin

# Install dependencies
npm install

# Start development server
npm run dev
```

### Environment Configuration
Create `.env.local` with required environment variables:
```env
NEXT_PUBLIC_API_URL=your_api_endpoint
NEXT_PUBLIC_CLOUDFLARE_TOKEN=your_cloudflare_token
```

### Available Scripts
- `npm run dev`: Start development server
- `npm run build`: Production build
- `npm run start`: Start production server
- `npm run lint`: Run ESLint

## Deployment

### Build Process
```bash
npm run build
npm run start
```

### Environment Variables
Ensure all required environment variables are configured for production deployment.

## Security Features

- JWT token authentication
- Role-based access control
- Route protection middleware
- Form validation with Zod
- XSS protection through React
- CSRF protection via token validation

## Performance Optimizations

- Next.js App Router for optimized routing
- React Query for efficient data fetching
- Image optimization with Next.js Image component
- Code splitting and lazy loading
- Tailwind CSS for minimal CSS bundle

## Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## License

MIT License - see LICENSE file for details. 