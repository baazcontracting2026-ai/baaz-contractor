import os
import zipfile

def create_posix_zip(source_dir, output_zip_path):
    """
    Creates a zip archive where all internal paths strictly use forward slashes ('/'),
    ensuring 100% compatibility with Linux-based hosting environments like Netlify.
    """
    print(f"\n--- Building {output_zip_path} from {source_dir} ---")
    with zipfile.ZipFile(output_zip_path, 'w', zipfile.ZIP_DEFLATED) as zipf:
        for root, dirs, files in os.walk(source_dir):
            for file in files:
                full_path = os.path.join(root, file)
                # Compute relative path from source_dir
                rel_path = os.path.relpath(full_path, source_dir)
                # Ensure POSIX forward slashes
                arcname = rel_path.replace('\\', '/')
                
                # Write to zip
                zipf.write(full_path, arcname)
                print(f"  Added: {arcname}")
    
    # Verify the created zip archive
    print(f"\nVerification of {output_zip_path}:")
    with zipfile.ZipFile(output_zip_path, 'r') as zipf:
        namelist = zipf.namelist()
        for name in namelist:
            if '\\' in name:
                raise ValueError(f"ERROR: Found backslash in zip entry: {name}")
            print(f"  OK: {name}")
    print(f"SUCCESS: {output_zip_path} has {len(namelist)} POSIX-compliant entries.\n")

if __name__ == '__main__':
    # 1. Option 1 Zip (Vercel edition with MD files)
    create_posix_zip(
        source_dir='option-1-vercel-tailwind-astro',
        output_zip_path='baaz-contractor-option-1-vercel.zip'
    )

    # 2. Option 2 Zip (Nordic edition without MD files)
    create_posix_zip(
        source_dir='option-2-architectural-modernist',
        output_zip_path='baaz-contractor-option-2-nordic.zip'
    )

    # 3. Complete Showcase Zip
    print("\n--- Building Complete Showcase Zip ---")
    complete_zip = 'baaz-contractor-complete-showcase.zip'
    with zipfile.ZipFile(complete_zip, 'w', zipfile.ZIP_DEFLATED) as zipf:
        for folder in ['option-1-vercel-tailwind-astro', 'option-2-architectural-modernist', 'shared-assets']:
            for root, dirs, files in os.walk(folder):
                for file in files:
                    full_path = os.path.join(root, file)
                    arcname = os.path.relpath(full_path, '.').replace('\\', '/')
                    zipf.write(full_path, arcname)
        for root_file in ['index.html', 'privacy-policy.html', 'terms.html', '404.html', '500.html', 'robots.txt', 'sitemap.xml']:
            if os.path.exists(root_file):
                zipf.write(root_file, root_file)
                print(f"  Added root: {root_file}")
    print(f"SUCCESS: {complete_zip} created.\n")

